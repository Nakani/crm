import React, { useEffect, useState } from 'react';
import ImeiTable from './sections/imei.section'
import UpcTable from './sections/upc.section'
import MaterialTable from 'material-table';

export function TableComponent(props) {

    const upcTable = (props) => {
        return (
            <UpcTable lists={props.data.upcs} history={props.history} />
        )
    }
    const imeiTable = (props) => {
        console.log('component for imei', props.data.imeis)
        const columns = [
            { title: 'Nome', field: 'name' },
            { title: 'UPC', field: 'upc' },
            { title: 'Data', field: 'date' }
        ];
        return (
            <MaterialTable
                title="Imeis"
                columns={columns}
                data={props.data.imeis}
                actions={[
                    {
                        icon: 'note_add',
                        tooltip: 'Adicionar IMEIS',
                        onClick: (event, rowData) => {
                            props.history.push('/imeis/' + rowData.upc);
                        }
                    }
                ]}
            />
        );
    }

    const renderTable = (props) => {
        switch (props.typeTable) {
            case 'upcTable':
                upcTable(props)
                break;

            case 'imeiTable':
                imeiTable(props)
                break;
        }
    }

    return (
        <>
            {renderTable(props)}
        </>
    )

}
