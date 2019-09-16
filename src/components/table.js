import React from 'react';
import MaterialTable from 'material-table';

export default function Table() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nome', field: 'nome' },
      { title: 'IMEI', field: 'imei' },
      { title: 'Data', field: 'data'},
    ],
    data: [
      { nome: 'Iphone 5s', imei: '89209310120983', data: '19/09/2019'},
      {
        nome: 'Iphone 6s',
        imei: '03821093812099',
        data: '20/09/2019',
      },
    ],
  });

  return (
    <MaterialTable
      title="Lista"
      columns={state.columns}
      data={state.data}
    />
  );
}