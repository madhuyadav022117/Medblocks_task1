export const COLUMNS = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    fixed: "left",
    width: 60,
    sorter: (a, b) => a.id - b.id,
    defaultSortOrder: "ascend",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, record) => `${record.firstName} ${record.lastName}`,
  },
  {
    title: "Date of Birth",
    dataIndex: "dob",
    key: "dob",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Registered At",
    dataIndex: "registeration_time",
    key: "registeration_time",
  },
];

export const MENU_IDS = {
  DASHBOARD: "DASHBOARD",
  REGISTER_PATIENTS: "REGISTER_PATIENTS",
  QUERY_PATIENTS: "QUERY_PATIENTS",
  PATIENT_LIST: "PATIENT_LIST",
};

export const MENU_IDS_VS_LABELS = {
  [MENU_IDS.DASHBOARD]: {
    label: "Dashboard",
    title: "Dashboard",
    helpText: "Welcome to MedBlocks, your patient registration system",
  },
  [MENU_IDS.REGISTER_PATIENTS]: {
    label: "Register Patient",
    title: "Register New Patient",
    helpText: "Enter patient information to add them to the system",
  },
  [MENU_IDS.QUERY_PATIENTS]: {
    label: "Query Patients",
    title: "Patient Query",
    helpText: "Run custom SQL queries against the patient database",
  },
  [MENU_IDS.PATIENT_LIST]: {
    label: "Patient List",
    title: "Patient List",
    helpText: "View, search or delete all registered patients",
  },
};
