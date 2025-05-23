// libs
import { useEffect, useState } from "react";

// components
import { Alert, Avatar, Card, Space, Spin, Typography } from "antd";
import {
  UserAddOutlined,
  SearchOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";

// hooks
import { useDatabaseContext } from "../context/DatabaseContext";
import { usePatientBroadcast } from "../hooks/usePatientBroadcast";

// constants
import { MENU_IDS, MENU_IDS_VS_LABELS } from "../utils/constants";

// utils
import { getTotalPatientCount } from "../services/DatabaseService";

const { Text } = Typography;

const Dashboard = ({ setSelectedKey }) => {
  const { isLoading, isInitialized, error } = useDatabaseContext();
  const [patientCount, setPatientCount] = useState(0);

  const loadData = async () => {
    if (isInitialized) {
      try {
        const totalPatientCount = await getTotalPatientCount();
        setPatientCount(totalPatientCount);
      } catch (err) {
        console.log("Error loading dashboard data:", err);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [isInitialized]);

  usePatientBroadcast((msg) => {
    if (msg.type === "patient-added" || msg.type === "patients-deleted") {
      loadData();
    }
  });

  const actions = [
    <Space
      key={MENU_IDS.REGISTER_PATIENTS}
      onClick={() => {
        setSelectedKey(MENU_IDS.REGISTER_PATIENTS);
      }}
    >
      <UserAddOutlined />
      <Text strong>{MENU_IDS_VS_LABELS[MENU_IDS.REGISTER_PATIENTS].title}</Text>
    </Space>,
    <Space
      key={MENU_IDS.QUERY_PATIENTS}
      onClick={() => {
        setSelectedKey(MENU_IDS.QUERY_PATIENTS);
      }}
    >
      <SearchOutlined />
      <Text strong>{MENU_IDS_VS_LABELS[MENU_IDS.QUERY_PATIENTS].title}</Text>
    </Space>,
    <Space
      key={MENU_IDS.PATIENT_LIST}
      onClick={() => {
        setSelectedKey(MENU_IDS.PATIENT_LIST);
      }}
    >
      <UsergroupDeleteOutlined />
      <Text strong>{MENU_IDS_VS_LABELS[MENU_IDS.PATIENT_LIST].title}</Text>
    </Space>,
  ];

  if (isLoading) {
    return (
      <>
        <Alert
          message="Setting up the database"
          description="Initializing the database and creating required tables. Please wait a moment..."
          type="info"
          showIcon
        />
        <div
          style={{
            height: "80%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      </>
    );
  }

  if (error) {
    <>
      <Alert
        message="Database Initialization Failed"
        description="An error occurred while setting up the database. Please try again or contact support."
        type="error"
        showIcon
        closable
      />
      <div
        style={{
          height: "80%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    </>;
  }
  return (
    <div>
      <Alert
        message="Database Initialized Successfully"
        description="Your database is ready to use. You can now add and manage records."
        type="success"
        showIcon
        closable
        style={{ marginBottom: "1rem" }}
      />
      <Card actions={actions} style={{ minWidth: 300 }}>
        <Card.Meta
          avatar={
            <Avatar src="https://as1.ftcdn.net/v2/jpg/07/41/72/54/1000_F_741725458_ZVV96XZCiETqWyTuA5HttFV1N9ygGVHM.jpg" />
          }
          title="Total Patients"
          description={
            <Text style={{ marginInline: "4px" }} strong>
              {patientCount}
            </Text>
          }
        />
      </Card>
    </div>
  );
};

export default Dashboard;
