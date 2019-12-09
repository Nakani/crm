import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

export default function UsersTable(props) {
	const { data, history } = props
	const columns = [
		{ title: 'Nome', field: 'name' },
		{ title: 'Email', field: 'email' },
	];
	const [list, setlist] = useState([]);

	useEffect(() => {
		if (data != null) {
			setlist(data)
		}
	}, [data]);

	return (
		<MaterialTable
			title='Lista de Usuários'
			columns={columns}
			data={list}
			actions={
				[{}
					//   {
					//     icon: 'note_add',
					//     tooltip: 'IMEIS',
					//     onClick: (event, rowData) => {

					//       history.push('/admin/imeis/' + rowData.upcId);
					//     }
					//   },
					//   // {
					//   //   icon: 'edit',
					//   //   tooltip: 'edit IMEIS',
					//   //   onClick: (event, rowData) => {
					//   //     props.editUpc(rowData.upcId)
					//   //   }
					//   // },
					//   {
					//     icon: 'delete',
					//     tooltip: 'Apagar Upc',
					//     onClick: (event, rowData) => {
					//       props.delUpc(rowData.upcId)
					//     }
					//   }
				]}
		/>
	);
}
