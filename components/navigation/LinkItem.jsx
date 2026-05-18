'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './navigation.module.css'

export default function LinkItem({ children, url, customStyles, onClick }) {
	const path = usePathname()
	let linkIsActiveStyle = path === url ? 'text-(--activeNavLink)' : 'text-(--links)'

	return (
		<li className={styles.navigation__link + ' px-1.5 py-1.5 ' + customStyles} onClick={onClick}>
			<Link href={url} className={styles.link__text + ' font-normal text-[1.8rem]  ' + linkIsActiveStyle}>
				{children}
			</Link>
		</li>
	)
}
