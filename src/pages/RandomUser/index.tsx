import { Button, Modal, Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import UserForm from './UserForm';

const RandomUser = () => {
	const { data, getDataUser } = useModel('randomuser');
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<RandomUser.Record>();

	useEffect(() => {
		getDataUser();
	}, []);

	interface RandomUserRecord {
		address: string;
		balance: string;
		first: string;
		last: string;
		email: string;
		created: string;
	}
	interface RandomUserColumnProps extends ColumnType<RandomUserRecord> {}

	const columns: RandomUserColumnProps[] = [
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'name',
			width: 200,
		},
		{
			title: 'Balance',
			dataIndex: 'balance',
			key: 'age',
			width: 100,
		},
		{
			title: 'Action',
			width: 200,
			align: 'center',
			render: (record: RandomUserRecord) => {
				return (
					<div>
						<Button
							onClick={() => {
								setVisible(true);
								setRow(record);
								setIsEdit(true);
							}}
						>
							Edit
						</Button>
						<Button
							style={{ marginLeft: 10 }}
							onClick={() => {
								const dataLocal: RandomUserRecord[] = JSON.parse(localStorage.getItem('data') as string);
								const newData = dataLocal.filter((item) => item.address !== record.address);
								localStorage.setItem('data', JSON.stringify(newData));
								getDataUser();
							}}
							type='primary'
						>
							Delete
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<Button
				type='primary'
				onClick={() => {
					setVisible(true);
					setIsEdit(false);
				}}
			>
				Add User
			</Button>
			<Table dataSource={data} columns={columns} />
			<Modal
				destroyOnClose
				footer={false}
				title={isEdit ? 'Edit User' : 'Add User'}
				visible={visible}
				onOk={() => {}}
				onCancel={() => {
					setVisible(false);
				}}
			>
				<UserForm row={row} isEdit={isEdit} data={data} setVisible={setVisible} getDataUser={getDataUser} />
			</Modal>
		</div>
	);
};

export default RandomUser;
