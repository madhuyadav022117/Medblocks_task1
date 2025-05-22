import { useLiveQuery, usePGlite } from "@electric-sql/pglite-react";
import { Alert, Button, notification, Popconfirm, Table } from "antd";
import { useState } from "react";
import { getParsedTableData } from "../utils/helper";

const RecordManager = () => {
  const db = usePGlite();
  const [api, contextHolder] = notification.useNotification();
  const items = useLiveQuery(`SELECT * FROM patients`);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { rows, columns } = getParsedTableData(items);

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const handleBulkDelete = async () => {
    const placeholders = selectedRowKeys.map((_, i) => `$${i + 1}`).join(",");
    try {
      await db.query(
        `DELETE FROM patients WHERE id in (${placeholders})`,
        selectedRowKeys
      );
      api.success({
        message: "Record Deleted Successfully",
      });
      setSelectedRowKeys([]);
    } catch (error) {
      api.error({
        message: "Failed to delete record",
        description: error.message,
      });
    }
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