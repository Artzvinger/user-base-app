import axios from 'axios'

const api = axios.create({
	baseURL: 'https://697011f0a06046ce61887951.mockapi.io/Testapi',
})

export const getUsers = async () => {
	const response = await api.get('/users')
	return response.data
}

export const createUser = async (user: { name: string; email: string }) => {
	const response = await api.post('/users', user)
	return response.data
}

export const updateUser = async (
	id: string,
	user: { name: string; email: string }
) => {
	const response = await api.put(`/users/${id}`, user)
	return response.data
}

export const deleteUser = async (id: string) => {
	await api.delete(`/users/${id}`)
}
