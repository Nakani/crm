import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

export default function SellsTable(props) {
  const { data, history } = props;
  const columns = [
    { title: "IMEI", field: "product.imei" },
    { title: "Cliente", field: "user.name" },
    { title: "Preço", field: "price" },
    { title: "Valor Recebido", field: "amountPaid" },
    { title: "Valor Restante", field: "pendingAmount" }
    // { title: "Data", field: "date" }
  ];
  const [list, setList] = useState([]);

  useEffect(() => {
    if (data !== null) {
      setList(data);
    }
  }, [data]);

  return (
    <MaterialTable
      title="Lista de Vendas"
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
          tooltip: "Apagar venda",
          onClick: (event, rowData) => {
            console.log("props.deleteUser(rowData.userId);");
          }
        }
      ]}
    />
  );
}
