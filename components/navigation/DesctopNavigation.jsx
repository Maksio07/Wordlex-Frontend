import LinkItem from '@/components/navigation/LinkItem'
import ModeChanger from '@/components/navigation/ModeChanger'
import Link from 'next/link'
import LogoutBtn from '@/components/navigation/LogoutBtn'
import Image from 'next/image'
import logo from '@/public/logo-main.png'
import styles from './navigation.module.css'

export default function DesctopNavigation({ userId, token }) {
	let content

	if (token) {
		content = (
			<div className='flex flex-row items-center justify-between w-full max-[675px]:w-0'>
				<ul className={styles.nav__ul + ' flex flex-row items-center'}>
					<LinkItem url={`/profile/${userId}`}>Główna strona</LinkItem>
				</ul>
				<ul className={styles.nav__ul + ' flex flex-row items-center'}>
					<LinkItem url={`/profile/${userId}/settings`}>Ustawienia Konta</LinkItem>
					<LogoutBtn />
					<ModeChanger />
				</ul>
			</div>
		)
	} else {
		content = (
			<div className='flex flex-row items-center justify-between w-full max-[675px]:w-0'>
				<ul className={styles.nav__ul + ' flex flex-row items-center'}>
					<LinkItem url={'/'}>Home</LinkItem>
					<LinkItem url={'/about-us'}>O nas</LinkItem>
					<LinkItem url={'/contact'}>Kontakt</LinkItem>
				</ul>
				<ul className={styles.nav__ul + ' flex flex-row items-center'}>
					<LinkItem url={'/signup'}>Utwórz konto</LinkItem>
					<LinkItem url={'/login'}>Zaloguj się</LinkItem>
					<ModeChanger />
				</ul>
			</div>
		)
	}

	return (
		<div className='wrapper flex flex-row items-center h-32 max-[675px]:justify-start'>
			<Link href={token ? `/profile/${userId}` : '/'} className={styles.logo}>
				<Image src={logo} alt='The logo of the page wordlex.' className='w-32 h-30 rounded-[18rem]' loading='eager' />
			</Link>
			{content}
		</div>
	)
}
