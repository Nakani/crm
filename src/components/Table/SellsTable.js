import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

import { formatValor } from "../../utils/formatNumber";

export default function SellsTable(props) {
  const { data, history } = props;
  const columns = [
    { title: "IMEI", field: "product.imei", editable: "never" },
    { title: "Cliente", field: "user.name", editable: "never" },
    { title: "Preço", field: "price", editable: "never" },
    { title: "Valor Recebido", field: "amountPaid" },
    { title: "Valor Restante", field: "pendingAmount", editable: "never" },
    { title: "Data", field: "date", editable: "never" }
  ];
  const [list, setList] = useState([]);

  useEffect(() => {
    if (data !== null) {
      setList(data);
    }
  }, [data]);

  console.log({ list });

  return (
    <>
      {list && (
        <MaterialTable
          title="Lista de Vendas"
          columns={columns}
          data={list}
          localization={{
            body: {
              editRow: {
                deleteText: "Deseja remover a venda?"
              },
              deleteTooltip: "Deletar",
              editTooltip: "Adicionar pagamanto"
            },
            header: { actions: "Ações " }
          }}
          editable={{
            onRowUpdate: (newData, oldData) => {
              new Promise((resolve, reject) => {
                props.addPayment(newData, () => resolve());
              });
            },
            onRowDelete: oldData => {
              new Promise((resolve, reject) => {
                props.deleteSell(oldData.sellId);
              });
            }
          }}
        />
      )}
    </>
  );
}
