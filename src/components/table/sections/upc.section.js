import React from 'react';
import MaterialTable from 'material-table';

export default function UpcTable(props) {
    const { lists, history } = props
    const columns = [
        { title: 'Nome', field: 'name' },
        { title: 'UPC', field: 'upc' },
        { title: 'Data', field: 'date' }
    ];

    return (
        <MaterialTable
            title="UPCs"
            columns={columns}
            data={lists}
            actions={[
                {
                    icon: 'note_add',
                    tooltip: 'Adicionar IMEIS',
                    onClick: (event, rowData) => {
                        history.push('/imeis/' + rowData.upc);
                    }
                }
            ]}
        />
    );
}