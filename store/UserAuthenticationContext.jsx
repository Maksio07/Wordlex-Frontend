'use client'
import { createContext, useState, useMemo, useEffect } from 'react'

export const UserAuthenticationContext = createContext({
	token: '',
	handleToken: () => {},
	confirmMessage: '',
	handleConfirmMessage: () => {},
	user: '',
	handleUser: () => {},
})

export default function UserAuthenticationContextProvider({ children, initialToken }) {
	const [token, setToken] = useState(initialToken)
	const [user, setUser] = useState(null)
	const [confirmMessage, setConfirmMessage] = useState('')

	function handleToken(userToken) {
		setToken(userToken)
	}

	function handleConfirmMessage(message) {
		setConfirmMessage(message)
	}

	useEffect(() => {
		setTimeout(() => {
			handleConfirmMessage('')
		}, 5000)
	})

	useEffect(() => {
		const savedUser = localStorage.getItem('userId')

		if (savedUser) {
			setUser(savedUser)
		}
	}, [])

	function handleUser(data) {
		localStorage.setItem('userId', data)
		setUser(data)
	}

	const value = useMemo(
		() => ({
			token,
			handleToken,
			confirmMessage,
			handleConfirmMessage,
			user,
			handleUser,
		}),
		[token, confirmMessage]
	)

	return <UserAuthenticationContext.Provider value={value}>{children}</UserAuthenticationContext.Provider>
}
