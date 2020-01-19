import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

export default function SellersTable(props) {
    const { data, history } = props;
    const columns = [
        { title: "Cliente", field: "client", editable: "never" },
        { title: "Vendas Realizadas", render: rowData => { return rowData.imeis.length }, editable: "never" },
    ];
    const [list, setList] = useState([]);

    useEffect(() => {
        if (data !== null) {
            const formatedList = transformList(data)
            setList(formatedList);
        }
    }, [data]);

    function transformList(sells) {
        const filteredSells = sells.filter(sell => sell.user && sell.product);

        const formatedSells = filteredSells.reduce((pre, cur) => {
            const client = cur.user ? cur.user.name : '';
            const soldImei = cur.product ? cur.product.imei : '';
            const imeis = (client in pre ? pre[client].imeis : [])

            if (client === '' || soldImei === '') return pre;

            pre[client] = {
                imeis: imeis.concat(soldImei)
            }

            return pre
        }, {})

        return Object.keys((formatedSells)).map(sell => ({
            client: sell,
            imeis: formatedSells[sell].imeis
        }));
    }

    return (
        <>
            {list && (
                <MaterialTable
                    title="Lista de Vendas"
                    columns={columns}
                    data={list}
                />
            )}
        </>
    );
}
