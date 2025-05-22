import { Avatar, Card, Space, Typography } from "antd";
import {
  UserAddOutlined,
  SearchOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { MENU_IDS, MENU_IDS_VS_LABELS } from "../utils/constants";
import { useLiveQuery } from "@electric-sql/pglite-react";
const { Text } = Typography;

const Dashboard = ({ setSelectedKey }) => {
  const result = useLiveQuery(
    `SELECT COUNT(*) AS total_patients FROM patients;`
  );

  const totalPatientCount = result?.rows?.[0]?.total_patients || 0;

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

  return (
    <div>
      <Card actions={actions} style={{ minWidth: 300 }}>
        <Card.Meta
          avatar={
            <Avatar src="https://as1.ftcdn.net/v2/jpg/07/41/72/54/1000_F_741725458_ZVV96XZCiETqWyTuA5HttFV1N9ygGVHM.jpg" />
          }
          title="Total Patients"
          description={
            <Text style={{ marginInline: "4px" }} strong>
              {totalPatientCount}
            </Text>
          }
        />
      </Card>
    </div>
  );
};

export default Dashboard;