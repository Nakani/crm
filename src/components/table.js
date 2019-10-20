import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { database } from '../services/database'
import moment from "moment";

export default function Table(props) {
  const { data, history, typeTable } = props
  const columns = [
    { title: 'Nome', field: 'name' },
    { title: 'UPC', field: 'upc' },
    { title: 'Data', field: 'date' }
  ];
  const [list, setlist] = useState([]);

  useEffect(() => {
    if (data != null) {
      setlist(data.products)
    }
  }, [data]);

  return (
    <MaterialTable
      title='Lista de UPC'
      columns={columns}
      data={list}
      actions={
        [
          {
            icon: 'note_add',
            tooltip: 'Adicionar IMEIS',
            onClick: (event, rowData) => {
              history.push('/imeis/' + rowData.upcId);
            }
          },
          {
            icon: 'delete',
            tooltip: 'Apagar Upc',
            onClick: (event, rowData) => {
              database.deleteUpc(rowData.upcId)
            }
          }
        ]}
    />
  );
}
