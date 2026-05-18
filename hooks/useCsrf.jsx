import useHTTP from './useHTTP'
import { useEffect, useState, useCallback } from 'react'

export default function useCsrf() {
	const [csrfToken, setCsfrToken] = useState('')
	const { sendRequest } = useHTTP()

	const fetchToken = useCallback(async () => {
        const data = await sendRequest('/csrf-token', { credentials: 'include' })
        data && setCsfrToken(data)
    }, [])

    useEffect(() => {
        fetchToken()
    }, [])

    return csrfToken
}
