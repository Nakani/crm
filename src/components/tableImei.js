import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { database } from '../services/database'

export default function TableImei(props) {
    const { data, history, dataUpc } = props
    const columns = [
        { title: 'Imei', field: 'imei' },
        { title: 'Data entrada', field: 'date' },
        { title: 'Situação', field: 'situacao' }
    ];
    const [list, setlist] = useState([]);


    useEffect(() => {
        if (data.length > 0) {
            setlist(data)
        }
    }, [data]);
    return (
        <MaterialTable
            title={dataUpc.name}
            columns={columns}
            data={list}
            actions={[
                {
                    icon: 'mode_edit',
                    tooltip: 'editar',
                    onClick: (event, rowData) => {
                        //history.push('/imeis/' + rowData.upc);
                    }
                },
                {
                    icon: 'delete',
                    tooltip: 'editar',
                    onClick: (event, rowData) => {
                        console.log(rowData.productId)
                        database.deleteImei(rowData.productId)
                        //history.push('/imeis/' + rowData.upc);
                    }
                },
            ]}
        />
    );
}
