import { useEffect, useState, useCallback } from 'react'
import useHTTP from './useHTTP'

export default function useUser() {
	const { error, sendRequest, setError, pending } = useHTTP()
	const [user, setUser] = useState(null)

	const fetchUser = useCallback(async () => {
		const data = await sendRequest('/profile/me', {
			credentials: 'include',
		})

		if (data !== undefined) {
			setUser(data.user)
		} else {
			setError('Coś poszło nie tak, spróbój ponownie.')
			setUser(null)
		}
	}, [])

	useEffect(() => {
		fetchUser()
	}, [])

	return { user, error, pending, setUser }
}
