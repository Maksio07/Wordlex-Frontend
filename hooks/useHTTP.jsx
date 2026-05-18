import { useState, useCallback } from 'react'

export default function useHTTP() {
	const [data, setData] = useState(null)
	const [pending, setPending] = useState(false)
	const [error, setError] = useState(null)

	function handleErrorState(err) {
		setError(err)
	}

	const sendRequest = useCallback(async (url, config) => {
		setPending(true)
		handleErrorState(null)
		// const URL = 'http://localhost:8080' + url
		const URL = 'https://wordlex-backend.onrender.com' + url
		// const URL = 'http://192.168.0.10:8080' + url

		try {
			const res = await fetch(URL, config)

			const contentType = res.headers.get('content-type')
			let resData

			if (contentType && contentType.includes('application/json')) {
				resData = await res.json()
			} else {
				const textData = await res.text()
				throw new Error('Coś poszło nie tak, spróbuj ponownie.')
			}

			if (!res.ok) {
				throw new Error(
					resData.message || 'Server nie odpowiada, sprawdź swoje połączenie z siecią i spróbuj ponownie.'
				)
			}

			setData(resData)
			return resData
		} catch (err) {
			console.log(err);
			handleErrorState(
				err.message === 'Failed to fetch'
					? 'Server nie odpowiada, sprawdź swoje połączenie z siecią i spróbuj ponownie.'
					: err.message
			)
			throw err
		} finally {
			setPending(false)
		}
	}, [])

	return {
		pending,
		error,
		data,
		sendRequest,
		setError: handleErrorState,
	}
}
