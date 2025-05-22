// libs
import { Layout } from "antd";
import { Footer, Header } from "antd/es/layout/layout";

// components


// utils
import theme from "../theme";
import MainLayout from "./MainLayout";

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          color: theme.colors.primary,
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        MedBlocks
      </Header>
      <MainLayout />
      <Footer style={{ textAlign: "center" }}>
        © 2025 Patient Management Portal. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default AppLayout;