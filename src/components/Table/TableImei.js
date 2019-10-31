import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

export default function TableImei(props) {
    const { data } = props
    const columns = [
        { title: 'Imei', field: 'imei' },
        { title: 'Data entrada', field: 'date' },
        { title: 'Situação', field: 'situacao' }
    ];

    return (
        <MaterialTable
            title='Imeis'
            columns={columns}
            data={data}
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
