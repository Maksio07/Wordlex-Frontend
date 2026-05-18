import { motion } from 'motion/react'
import Image from 'next/image'
import logo from '@/public/logo-main.png'
import Link from 'next/link'
import LinkItem from '@/components/navigation/LinkItem'
import LogoutBtn from './LogoutBtn'
import ModeChanger from '@/components/navigation/ModeChanger'
import styles from './navigation.module.css'

export default function MobileNavigation({ onCloseNavigation, userId, token }) {
	let content

	if (token) {
		content = (
			<ul className='relative flex flex-col justify-center items-center w-full h-full'>
				<LinkItem url={`/profile/${userId}`} onClick={onCloseNavigation}>
					Główna strona
				</LinkItem>
				<LinkItem url={`/profile/${userId}/settings`} onClick={onCloseNavigation}>
					Ustawienia Konta
				</LinkItem>
				<LogoutBtn onCloseNavigation={onCloseNavigation} url={'/login'}>
					Wyloguj się
				</LogoutBtn>
			</ul>
		)
	} else {
		content = (
			<ul className='relative flex flex-col justify-center items-center w-full h-full'>
				<LinkItem url={'/'} onClick={onCloseNavigation}>
					Home
				</LinkItem>
				<LinkItem url={'/about-us'} onClick={onCloseNavigation}>
					O nas
				</LinkItem>
				<LinkItem url={'/contact'} onClick={onCloseNavigation}>
					Kontakt
				</LinkItem>
				<LinkItem url={'/signup'} onClick={onCloseNavigation}>
					Utwórz konto
				</LinkItem>
				<LinkItem url={'/login'} onClick={onCloseNavigation}>
					Zaloguj się
				</LinkItem>
			</ul>
		)
	}

	return (
		<motion.div
			className='wrapper relative flex flex-col items-center w-screen h-screen bg-(--navigationBackground) overflow-hidden'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.5 } }}>
			<Link href={token ? `/profile/${userId}` : '/'} className={`${styles.logo} ${styles.mob__logo}`}>
				<Image src={logo} alt='The logo of the page wordlex.' className='w-32 h-30 rounded-[18rem]' loading='eager' />
			</Link>
			<ModeChanger customStyles={styles.mobile__mode__changer__btn} />
			{content}
		</motion.div>
	)
}
