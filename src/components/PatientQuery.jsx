import { useState } from "react";
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Typography,
  Table,
  message,
  Space,
  Layout,
  notification,
} from "antd";
import { usePGlite } from "@electric-sql/pglite-react";

const { Text } = Typography;
const { TextArea } = Input;

const templateQueries = [
  { label: "All Patients", value: "SELECT * FROM patients;" },
  {
    label: "Only Female Patients",
    value: "SELECT * FROM patients WHERE gender = 'Female';",
  },
  {
    label: "Patients Over Age 50",
    value: "SELECT * FROM patients WHERE age > 50;",
  },
];

const PatientQuery = () => {
  const db = usePGlite();
  const [api, contextHolder] = notification.useNotification();
  const [sql, setSql] = useState("");
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleRunQuery = async () => {
    if (!sql.trim()) {
      api.warning({
        message: "Please enter a SQL query",
        duration: 3,
      });
      return;
    }

    try {
      const result = await db.query(sql);
      const rows = result.rows || [];

      if (rows.length === 0) {
        message.info("No results found.");
        setData([]);
        setColumns([]);
        return;
      }

      const dynamicColumns = Object.keys(rows[0]).map((key) => ({
        title: key.toUpperCase(),
        dataIndex: key,
        key,
      }));

      const keyedData = rows.map((row, index) => {
        const formattedRow = {};

        for (const key in row) {
          const value = row[key];

          if (value instanceof Date) {
            formattedRow[key] = value.toLocaleDateString();
          } else if (value === undefined || value === null) {
            formattedRow[key] = "null";
          } else {
            formattedRow[key] = value;
          }
        }

        return {
          key: index,
          ...formattedRow,
        };
      });

      console.log("Query Result:", keyedData);
      setColumns(dynamicColumns);
      setData(keyedData);
    } catch (error) {
      api.error({
        message: "Query Error",
        description: error.message,
        duration: 3,
      });
    }
  };

  return (
    <div>
      {contextHolder}
      {/* Top Section: SQL Input + Templates */}
      <Layout
        style={{
          background: "#fff",
          padding: "1rem",
          borderRadius: "8px",
          marginBlock: "1rem",
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space
            style={{
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Text strong>SQL Query</Text>
            <Select
              placeholder="Select a template query"
              onChange={(value) => setSql(value)}
              options={templateQueries}
            />
          </Space>
          <Row gutter={16} style={{ marginBottom: "1rem" }}>
            <Col span={24}>
              <TextArea
                style={{ fontFamily: "monospace" }}
                rows={3}
                value={sql}
                onChange={(e) => setSql(e.target.value)}
                placeholder="Enter your SQL query here"
              />
            </Col>
          </Row>
          <Row justify="start">
            <Col>
              <Button type="primary" onClick={handleRunQuery} block>
                Run Query
              </Button>
            </Col>
          </Row>
        </Space>
      </Layout>

      {/* Bottom Section: Query Result Table */}
      <Table
        title={() => <Text strong>Query Results</Text>}
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 2, position: ["topRight"] }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default PatientQuery;