import React, { useEffect, useState } from 'react'
import {Table, Button, Modal,Form,Input,Space,Popconfirm,message,} from 'antd'
import { getUsers, createUser, updateUser, deleteUser } from '../api/usersApi'

type User = {
	id: string
	name: string
	email: string
}

export const UsersPage = () => {
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState(true)
	const [isModalOpen, setModalOpen] = useState(false)
	const [editingUser, setEditingUser] = useState<User | null>(null)
	const [form] = Form.useForm()

	useEffect(() => {
		getUsers()
			.then(data => setUsers(data))
			.catch(() => message.error('Ошибка загрузки пользователей'))
			.finally(() => setLoading(false))
	}, [])

	const openCreateModal = () => {
		setEditingUser(null)
		form.resetFields()
		setModalOpen(true)
	}

	const openEditModal = (user: User) => {
		setEditingUser(user)
		form.setFieldsValue(user)
		setModalOpen(true)
	}

	const handleDelete = async (id: string) => {
		await deleteUser(id)
		setUsers(prev => prev.filter(u => u.id !== id))
		message.success('Пользователь удалён')
	}

	const handleSave = async () => {
		const values = await form.validateFields()

		if (editingUser) {
			const updated = await updateUser(editingUser.id, values)
			setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)))
			message.success('Изменения сохранены')
		} else {
			const created = await createUser(values)
			setUsers(prev => [...prev, created])
			message.success('Пользователь добавлен')
		}

		setModalOpen(false)
	}

	const columns = [
		{ title: 'Имя', dataIndex: 'name', key: 'name' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{
			title: 'Действия',
			key: 'actions',
			render: (_: any, record: User) => (
				<Space>
					<Button onClick={() => openEditModal(record)}>Редактировать</Button>
					<Popconfirm
						title='Удалить пользователя?'
						onConfirm={() => handleDelete(record.id)}
					>
						<Button danger>Удалить</Button>
					</Popconfirm>
				</Space>
			),
		},
	]

	return (
		<div style={{
				display: "flex",
				justifyContent: "center",
			}}>
			<div
				style={{
					padding: 30,
					width: '1200px',
					justifyContent: 'center',
				}}
			>
				<h2 style={{ textAlign: 'center', marginBottom: 20 }}>
					Список пользователей
				</h2>

				<Button
					type='primary'
					onClick={openCreateModal}
					style={{ marginBottom: 20 }}
				>
					Добавить пользователя
				</Button>

				<Table
					rowKey='id'
					columns={columns}
					dataSource={users}
					loading={loading}
				/>

				<Modal
					title={
						editingUser ? 'Редактировать пользователя' : 'Создать пользователя'
					}
					open={isModalOpen}
					onOk={handleSave}
					onCancel={() => setModalOpen(false)}
					okText='Сохранить'
					cancelText='Отмена'
				>
					<Form form={form} layout='vertical'>
						<Form.Item
							label='Имя'
							name='name'
							rules={[{ required: true, message: 'Введите имя!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label='Email'
							name='email'
							rules={[{ required: true, message: 'Введите email!' }]}
						>
							<Input />
						</Form.Item>
					</Form>
				</Modal>
			</div>
		</div>
	)
}
