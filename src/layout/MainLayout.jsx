// libs
import React, { useState } from "react";

// components
import { Flex, Layout } from "antd";
import { Typography } from "antd";
import Sidebar from "../components/Sidebar";

// pages
import RecordManager from "../pages/RecordManager";
import Dashboard from "../pages/Dashboard";
import PatientQuery from "../pages/PatientQuery";
import StepRegisterPatientForm from "../pages/StepRegisterPatientForm";

// constannts
import { MENU_IDS, MENU_IDS_VS_LABELS } from "../utils/constants";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const MainLayout = () => {
  const [selectedKey, setSelectedKey] = useState(MENU_IDS.DASHBOARD);

  const renderContent = () => {
    switch (selectedKey) {
      case MENU_IDS.DASHBOARD:
        return <Dashboard setSelectedKey={setSelectedKey} />;

      case MENU_IDS.REGISTER_PATIENTS:
        return <StepRegisterPatientForm />;

      case MENU_IDS.QUERY_PATIENTS:
        return <PatientQuery />;

      case MENU_IDS.PATIENT_LIST:
        return <RecordManager />;

      default:
        return <Dashboard setSelectedKey={setSelectedKey} />;
    }
  };

  return (
    <Layout>
      <Sider theme="light" width={256}>
        <Sidebar onSelect={setSelectedKey} selectedKey={selectedKey} />
      </Sider>
      <Layout style={{ paddingInline: "6rem", paddingTop: "2rem" }}>
        <Flex vertical>
          <Title
            style={{ marginBottom: "0.4rem", fontWeight: "bold" }}
            level={2}
          >
            {MENU_IDS_VS_LABELS[selectedKey].title}
          </Title>
          <Text type="secondary">
            {MENU_IDS_VS_LABELS[selectedKey].helpText}
          </Text>
        </Flex>
        <Content
          style={{
            overflow: "auto",
            flex: 1,
            marginTop: "2rem",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
