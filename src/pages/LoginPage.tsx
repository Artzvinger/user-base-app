import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Typography } from 'antd'

const { Title } = Typography

export const LoginPage = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const onFinish = (values: { login: string; password: string }) => {
		setLoading(true)
		setTimeout(() => {
			navigate('/users')
			setLoading(false)
		}, 800)
	}

	return (
		<div
			style={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#f0f2f5',
			}}
		>
			<Card style={{ width: 350, textAlign: 'center', padding: '10px 20px' }}>
				<Title level={3}>Вход в систему</Title>

				<Form layout='vertical' onFinish={onFinish}>
					<Form.Item
						label='Логин'
						name='login'
						rules={[{ required: true, message: 'Введите логин!' }]}
					>
						<Input placeholder='Введите логин' />
					</Form.Item>

					<Form.Item
						label='Пароль'
						name='password'
						rules={[{ required: true, message: 'Введите пароль!' }]}
					>
						<Input.Password placeholder='Введите пароль' />
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' block loading={loading}>
							Войти
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	)
}
