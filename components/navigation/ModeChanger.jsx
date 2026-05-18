'use client'

import { useContext } from 'react'
import Sun from '@/components/icons/Action/Sun'
import Moon from '@/components/icons/Action/Moon'
import { ModeContext } from '@/store/modeContext'
import styles from './navigation.module.css'

export default function ModeChanger({customStyles}) {
	const modeCtx = useContext(ModeContext)

	return (
		<li className={styles.navigation__link + ' ' + customStyles}>
			<button
				onClick={() => modeCtx.handleMode(modeCtx.mode)}
				className={styles.mode__changer + ' px-1.5 py-1.5 cursor-pointer'} 
				type='button'
				aria-label='Change color'>
				{modeCtx.mode === 'dark' ? (
					<Sun width={'2.2rem'} heigth={'2.2rem'} fill={'var(--links)'} stroke={'var(--links)'} />
				) : (
					<Moon width={'2.2rem'} heigth={'2.2rem'} fill={'var(--links)'} />
				)}
			</button>
		</li>
	)
}
