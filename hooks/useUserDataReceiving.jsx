'use client'

import { useState } from 'react'

export function useUserDataReceiving(data) {
	const [enteredData, setEnteredData] = useState(data)

	function handleEnteredData(e) {
		e.preventDefault()
		const target = e.target

		setEnteredData(prevState => {
			return {
				...prevState,
				[target.name]: target.value,
			}
		})
	}

	return { enteredData, handleEnteredData }
}
