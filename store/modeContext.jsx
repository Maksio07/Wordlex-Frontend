'use client'

import { createContext, useEffect, useState } from 'react'

export const ModeContext = createContext({
	mode: '',
	handleMode: () => {},
	shadowIsActive: '',
	handleShadowIsActive: () => {},
	mobNavigationIsOpen: '',
	handleMobNavigationIsOpen: () => {},
})

export default function ModeContextProvider({ children }) {
	const [mode, setMode] = useState('')
	const [mobNavigationIsOpen, setMobNavigationIsOpen] = useState(false)

	const [shadowIsActive, setShadowIsActive] = useState(false)

	useEffect(() => {
		setMode(window.localStorage.mode)
	}, [])

	function handleMode(mode) {
		setMode(mode === 'light' ? 'dark' : 'light')
	}

	useEffect(() => {
		window.localStorage.setItem('mode', mode)
		document.documentElement.className = mode
	}, [mode])

	function handleMobNavigationIsOpen() {
		setMobNavigationIsOpen(prevState => !prevState)
	}

	function handleShadowIsActive(value) {
		setShadowIsActive(value)
	}

	const value = {
		mode,
		handleMode,
		mobNavigationIsOpen,
		handleMobNavigationIsOpen,
		handleShadowIsActive,
		shadowIsActive,
	}

	return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>
}
