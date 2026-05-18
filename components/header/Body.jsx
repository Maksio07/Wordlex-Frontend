'use client'
import { useContext } from 'react'
import { ModeContext } from '../../store/modeContext'
import ModalShadow from '../UI/ModalShadow'

export default function Body({ children }) {
	const modeCtx = useContext(ModeContext)
	let bodyStyle

	if (modeCtx.mobNavigationIsOpen || modeCtx.shadowIsActive) {
		bodyStyle = ' overflow-hidden'
	}

	return (
		<body className={bodyStyle}>
			{modeCtx.shadowIsActive && <ModalShadow />}
			{children}
		</body>
	)
}
