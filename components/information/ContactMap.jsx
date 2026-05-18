import Facebook from '../icons/Facebook'
import Instagram from '../icons/Instagram'
import Telegram from '../icons/Telegram'
import Linkedin from '../icons/Linkedin'
import ContactMapLinkItem from './ContactMapLinkItem'
import styles from './contact-map.module.css'

export default function ContactMap() {
	return (
		<div className={styles.contact__map__container + ' flex items-center justify-evenly h-220 w-full'}>
			<iframe
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2393.5590399140506!2d17.8963259771922!3d53.13606087222916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47030db411c43eff%3A0x2217e44d1b30ff3f!2sKapliczka%20ko%C5%82o%20stawu%2C%20w%20dawnym%20centrum%20wsi%20Pr%C4%85dy!5e0!3m2!1spl!2spl!4v1745401484486!5m2!1spl!2spl'
				loading='lazy'
				className={styles.contact__map + ' w-[48%] h-176 rounded-[2.8rem]'}
				title='Wordlex S.A. location Lisia 40, 85-374 Bydgoszcz'></iframe>

			<div className={styles.links__container + ' flex flex-col w-[50%]'}>
				<h2 className={styles.title + ' text-[3.6rem] font-medium text-(--beInTouchTitle) text-center'}>
					Bądź w Kontakcie
				</h2>
				<p className={styles.info + ' text-[1.6rem] font-medium text-pretty text-(--title) text-center'}>
					Znajdź nas w mediach społecznościowych. Bądź na bieżąco z naszymi aktualnościami, ofertami i inspiracjami,
					śledząc nas na platformach społecznościowych. Dołącz do naszej społeczności i bądź częścią naszych działań!
				</p>
				<div className=' flex flex-wrap justify-center'>
					<ContactMapLinkItem
						href={'https://www.facebook.com'}
						name={'Facebook'}
						customStyles={'bg-(--facebook)'}
						icon={<Facebook fill='var(--white)' width='2rem' height='2rem' />}
					/>
					<ContactMapLinkItem
						href={'https://www.linkedin.com'}
						name={'Linkedin'}
						customStyles={'bg-(--linkedin)'}
						icon={<Linkedin fill='var(--white)' width='2rem' height='2rem' />}
					/>
					<ContactMapLinkItem
						href={'https://www.instagram.com'}
						name={'Instagram'}
						customStyles={'bg-(--instagram)'}
						icon={<Instagram fill='var(--white)' width='2rem' height='2rem' />}
					/>
					<ContactMapLinkItem
						href={'https://www.telegram.org'}
						name={'Telegram'}
						customStyles={'bg-(--telegram)'}
						icon={<Telegram fill='var(--white)' width='2rem' height='2rem' />}
					/>
				</div>
			</div>
		</div>
	)
}
