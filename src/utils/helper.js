import { COLUMNS } from "./constants";

export const adaptItems = (items = []) => {
  return items.map((item) => {
    return {
      key: item.id,
      firstName: item.firstname,
      lastName: item.lastname,
      dob: item.dob?.toLocaleString("en-IN"),
      insurance_provider: item.insurance_provider ?? "NULL",
      insurance_id: item.insurance_id ?? "NULL",
      notes: item.notes ?? "NULL",
      gender: item.gender,
      phone: item.phone,
      email: item.email,
      registeration_time: item.registeration_time?.toLocaleString("en-IN"),
      id: item.id,
      address: item.address,
    };
  });
};

export const getParsedTableData = (tableData) => {
  if (!tableData || !tableData.rows?.length) {
    return {
      columns: COLUMNS,
      rows: [],
      totalCount: 0,
    };
  }

  const { rows } = tableData;
  const parsedRows = adaptItems(rows);

  return {
    columns: COLUMNS,
    rows: parsedRows,
    totalCount: parsedRows.length,
  };
};