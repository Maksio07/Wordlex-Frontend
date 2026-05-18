import Link from 'next/link'
import ContactMapLinkItem from './ContactMapLinkItem'
import Facebook from '../icons/Facebook'
import Instagram from '../icons/Instagram'
import Telegram from '../icons/Telegram'
import Linkedin from '../icons/Linkedin'
import styles from './footer.module.css'

export default function Footer() {
	const date = new Date()
	const currentYear = date.getFullYear()

	return (
		<div className='wrapper flex flex-col justify-center w-full h-120 max-[650px]:h-220'>
			<div className={styles.links__container + ' flex justify-evenly'}>
				<div className={styles.links__box + ' flex flex-col '}>
					<h3 className={' text-[2.4rem] font-medium text-center'}>Pomoc</h3>
					<Link href={'https://android.com.pl'} target='_blank' className={styles.link__item + ' text-[1.6rem]'}>
						Android
					</Link>
					<Link href={'https://www.apple.com'} target='_blank' className={styles.link__item + ' text-[1.6rem]'}>
						Apple
					</Link>
					<Link href={'https://www.microsoft.com'} target='_blank' className={styles.link__item + ' text-[1.6rem]'}>
						Windows
					</Link>
				</div>
				<div className={styles.links__box + ' flex flex-col '}>
					<h3 className={' text-[2.4rem] font-medium text-center'}>Przydatne Linki</h3>
					<Link href={'/'} className={styles.link__item + ' text-[1.6rem]'}>
						Strona startowa
					</Link>
					<Link href={'/about-us'} className={styles.link__item + ' text-[1.6rem]'}>
						O nas
					</Link>
					<Link href={'/login'} className={styles.link__item + ' text-[1.6rem]'}>
						Login
					</Link>
				</div>
				<div className={styles.icons__container + ' flex flex-col items-center'}>
					<h3 className={styles.sociail__media__title + ' text-[2.4rem] font-medium text-center'}>
						Media Społecznościowe
					</h3>
					<div className='flex flex-wrap'>
						<ContactMapLinkItem
							href={'https://www.facebook.com'}
							arialabel={'Facebook'}
							icon={<Facebook height='2rem' width='2rem' fill='var(--white)' />}
							customStyles={styles.icon}
						/>
						<ContactMapLinkItem
							href={'https://www.linkedin.com'}
							arialabel={'Linkedin'}
							customStyles={styles.icon}
							icon={<Linkedin fill='var(--white)' width='2rem' height='2rem' />}
						/>
						<ContactMapLinkItem
							href={'https://www.instagram.com'}
							arialabel={'Instagram'}
							customStyles={styles.icon}
							icon={<Instagram fill='var(--white)' width='2rem' height='2rem' />}
						/>
						<ContactMapLinkItem
							href={'https://www.telegram.org'}
							arialabel={'Telegram'}
							customStyles={styles.icon}
							icon={<Telegram fill='var(--white)' width='2rem' height='2rem' />}
						/>
					</div>
				</div>
			</div>
			<p className={styles.copyright + ' text-center text-[1.6rem] tracking-[.08rem]'}>
				Wszelkie prawa zastrzeżone &copy;{currentYear} | Wordlex S.A.
			</p>
		</div>
	)
}
