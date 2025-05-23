// libs
import { useEffect, useState } from "react";

// components
import { Alert, Button, notification, Popconfirm, Table } from "antd";

// hooks
import { useDatabaseContext } from "../context/DatabaseContext";
import { usePatientBroadcast } from "../hooks/usePatientBroadcast";
import { useHandleBulkDelete } from "../hooks/useHandleBulkDelete";

// utils
import { getParsedTableData } from "../utils/helper";
import { getAllPatients } from "../services/DatabaseService";

const RecordManager = () => {
  const { isInitialized } = useDatabaseContext();
  const [api, contextHolder] = notification.useNotification();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (isInitialized) {
      loadPatients();
    }
  }, [isInitialized]);

  const loadPatients = async () => {
    try {
      const patientData = await getAllPatients();
      setPatients(patientData);
    } catch (error) {
      console.error("Error loading patients:", error);
    }
  };

  usePatientBroadcast((msg) => {
    if (msg.type === "patient-added" || msg.type === "patients-deleted") {
      loadPatients();
    }
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { rows, columns } = getParsedTableData(patients);

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const { handleDelete } = useHandleBulkDelete();

  const handleBulkDelete = async () => {
    await handleDelete({
      selectedRowKeys,
      onSuccess: () => {
        api.success({
          message: "Record Deleted Successfully",
        });
        setSelectedRowKeys([]);
      },
      onFailure: (error) => {
        api.error({
          message: "Failed to delete record",
          description: error.message,
        });
      },
    });
  };

  return (
    <>
      {contextHolder}
      {selectedRowKeys.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 70,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease",
            maxWidth: 200,
            width: "90%",
          }}
        >
          <Alert
            message={`${selectedRowKeys.length} selected`}
            type="error"
            showIcon
            action={
              <Popconfirm
                title="Delete selected records?"
                onConfirm={handleBulkDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
            }
          />
        </div>
      )}
      <Table
        rowSelection={rowSelection}
        bordered
        columns={columns}
        dataSource={rows}
        pagination={{ position: ["bottomRight"], pageSize: 8 }}
        style={{ marginBlock: "1rem" }}
        scroll={{ x: "max-content" }}
        rowKey="id"
      />
    </>
  );
};

export default RecordManager;
