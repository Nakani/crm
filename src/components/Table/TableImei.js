import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

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
            title='teste'
            columns={columns}
            data={list}
            actions={[
                {
                    icon: 'mode_edit',
                    tooltip: 'editar',
                    onClick: (event, rowData) => {
                        props.editImei()
                    }
                },
                {
                    icon: 'delete',
                    tooltip: 'editar',
                    onClick: (event, rowData) => {
                        let dataImei = {
                            productId: rowData.productId,
                            upcId: rowData.upcId
                        }
                        props.delImei(dataImei)
                    }
                },
            ]}
        />
    );
}
