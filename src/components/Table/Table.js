import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { database } from '../../services/database';
import moment from "moment";

export default function Table(props) {
  const { data, history, typeTable } = props
  const columns = [
    { title: 'Nome', field: 'name' },
    { title: 'Quantidade Total', field: 'quantTotal' },
    { title: 'Custo', field: 'custo' },
    { title: 'Valor', field: 'valor' },
    { title: 'Lucro R$', field: 'lucro' },
  ];
  const [list, setlist] = useState([]);

  useEffect(() => {
    if (data != null) {
      setlist(data)
    }
  }, [data]);
  return (
    <MaterialTable
      title='Lista de Produto'
      columns={columns}
      data={list}
      actions={
        [
          {
            icon: 'note_add',
            tooltip: 'IMEIS',
            onClick: (event, rowData) => {

              history.push('/admin/imeis/' + rowData.upcId);
            }
          },
          {
            icon: 'edit',
            tooltip: 'edit IMEIS',
            onClick: (event, rowData) => {
              props.editUpc(rowData.upcId)
            }
          },
          {
            icon: 'delete',
            tooltip: 'Apagar Upc',
            onClick: (event, rowData) => {
              props.delUpc(rowData.upcId)
            }
          }
        ]}
    />
  );
}
