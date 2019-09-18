import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

export default function Table() {
  const columns = [
    { title: 'Nome', field: 'name' },
    { title: 'UPC', field: 'upc' },
    { title: 'Data', field: 'date' }
  ];
  const [data, setData] = useState([]);

  const getData = event => {
    firebase.initializeApp({
      apiKey: 'AIzaSyDzf4lG8KCLZGZUIjKqcI_z8sCLGAzbEOE',
      authDomain: 'crmapple-97bfd.firebaseapp.com',
      projectId: 'crmapple-97bfd'
    });

    var db = firebase.firestore();
    db.collection('produto')
      .get()
      .then(querySnapshot => {
        setData(querySnapshot.docs.map(doc => doc.data()));
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MaterialTable
      title="Lista"
      columns={columns}
      data={data}
      actions={[
        {
          icon: 'note_add',
          tooltip: 'Adicionar IMEIS',
          onClick: (event, rowData) => {
            console.log( rowData)
          }
        }
      ]}
    />
  );
}
