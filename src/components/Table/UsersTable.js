import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

export default function UsersTable(props) {
  const { data, history } = props;
  const columns = [
    { title: "Nome", field: "name" },
    { title: "Email", field: "email" }
  ];
  const [list, setList] = useState([]);

  useEffect(() => {
    if (data !== null) {
      setList(data);
    }
  }, [data]);

  return (
    <MaterialTable
      title="Lista de Clientes"
      columns={columns}
      data={list}
      actions={[
        {
          icon: "delete",
          tooltip: "Apagar cliente",
          onClick: (event, rowData) => {
            props.deleteUser(rowData.userId);
          }
        }
      ]}
    />
  );
}
