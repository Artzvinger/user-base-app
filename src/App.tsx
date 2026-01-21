import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { UsersPage } from './pages/UsersPage'
import { NotFoundPage } from './pages/NotFoundPage'

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Navigate to='/login' replace />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}
