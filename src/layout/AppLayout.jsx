// libs
import { Layout } from "antd";
import { Footer, Header } from "antd/es/layout/layout";

// components
import MainLayout from "./MainLayout";

// utils
import theme from "../theme";

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
      <Footer style={{ textAlign: "center" }}>Build using PGLite</Footer>
    </Layout>
  );
};

export default AppLayout;
