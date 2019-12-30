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
      title="Lista de Usuários"
      columns={columns}
      data={list}
      actions={[
        // {
        //   icon: 'edit',
        //   tooltip: 'edit IMEIS',
        //   onClick: (event, rowData) => {
        //     props.editUpc(rowData.upcId)
        //   }
        // },
        {
          icon: "delete",
          tooltip: "Apagar usuário",
          onClick: (event, rowData) => {
            props.deleteUser(rowData.userId);
          }
        }
      ]}
    />
  );
}
