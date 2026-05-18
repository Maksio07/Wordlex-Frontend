'use client'
import { useContext } from 'react'
import { UserAuthenticationContext } from '@/store/UserAuthenticationContext'
import LinkItem from './LinkItem'
import useHTTP from '@/hooks/useHTTP'
import useCsrf from '@/hooks/useCsrf'

export default function LogoutBtn({ onCloseNavigation }) {
	const { sendRequest, setError } = useHTTP()
	const isAuthCtx = useContext(UserAuthenticationContext)
	const { csrfToken } = useCsrf()

	async function logout() {
		const resData = await sendRequest('/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			body: undefined,
			credentials: 'include',
		})

		if (resData === undefined) {
			setError('Coś poszło nie tak, sprubój ponownie.')
		} else {
			isAuthCtx.handleToken(null)
			isAuthCtx.handleUser(null)
			isAuthCtx.handleConfirmMessage('Jesteś wylogowany/-a')
		}

		onCloseNavigation !== undefined && onCloseNavigation()
	}

	return (
		<LinkItem url={'/login'} onClick={logout}>
			Wyloguj się
		</LinkItem>
	)
}
