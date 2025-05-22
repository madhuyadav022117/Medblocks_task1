// Sidebar.tsx
import React from "react";
import {
  HomeOutlined,
  UserAddOutlined,
  SearchOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { MENU_IDS_VS_LABELS, MENU_IDS } from "../utils/constants";



const items = [
  {
    key: MENU_IDS.DASHBOARD,
    icon: <HomeOutlined />,
    label: MENU_IDS_VS_LABELS["DASHBOARD"].label,
  },
  {
    key: MENU_IDS.REGISTER_PATIENTS,
    icon: <UserAddOutlined />,
    label: MENU_IDS_VS_LABELS["REGISTER_PATIENTS"].label,
  },
  {
    key: MENU_IDS.QUERY_PATIENTS,
    icon: <SearchOutlined />,
    label: MENU_IDS_VS_LABELS["QUERY_PATIENTS"].label,
  },
  {
    key: MENU_IDS.PATIENT_LIST,
    icon: <UsergroupDeleteOutlined />,
    label: MENU_IDS_VS_LABELS["PATIENT_LIST"].label,
  },
];


const Sidebar = ({ onSelect, selectedKey }) => {
  return (
    <Menu
      selectedKeys={[selectedKey]}
      mode="inline"
      theme="light"
      items={items}
      onClick={({ key }) => onSelect(key)}
      style={{ width: 256 }}
    />
  );
};

export default Sidebar;