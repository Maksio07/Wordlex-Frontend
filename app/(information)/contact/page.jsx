'use client'

import Image from 'next/image'
import styles from './contact.module.css'
import contactUsImgBig from '../../../public/contact/contact-us-big1.jpg'
import contactUsImgSmall from '../../../public/contact/contact-us-small1.jpg'
import useWindowSize from '../../../hooks/useWindowSize'
import ContactForm from '../../../components/information/ContactForm'
import ContactMap from '../../../components/information/ContactMap'
import Footer from '../../../components/information/Footer'

export default function Contact() {
	const { width } = useWindowSize()

	return (
		<>
			<section>
				<div
					className={styles.top + ' flex justify-evenly items-center h-224 max-[675px]:h-260 max-[415px]:h-220 w-full'}>
					<div className='wrapper'>
						<div className=' flex items-center justify-evenly max-[675px]:flex-col max-[675px]:justify-start'>
							<div className={styles.title__box + ' '}>
								<h1 className={styles.title + ' text-(--links) text-center text-6xl font-bold'}>
									Skontaktuj się z nami
								</h1>
								<h2 className={styles.subtitle + ' text-[2.4rem] text-center font-medium text-(--links) text-wrap'}>
									Masz pytania? Potrzebujesz więcej informacji? Jesteśmy do Twojej dyspozycji!
								</h2>
							</div>
							<Image
								loading='eager'
								src={width > 650 ? contactUsImgBig : contactUsImgSmall}
								className={styles.top__img + ' w-160 h-160 rounded-[.8rem]'}
								alt="Three sticks cards with 'contact us' sentence on the top."
							/>
						</div>
					</div>
				</div>
				<div className='wrapper'>
					<div
						className={
							styles.data__container + ' flex items-center justify-evenly flex-wrap w-full h-184 max-[763px]:min-h-280'
						}>
						<div
							className={
								styles.data__box + ' flex flex-col items-center justify-center w-136 h-80 rounded-xl bg-(--white)'
							}>
							<h3 className={styles.data__title + ' text-[2.4rem] text-(--navigationBackground)'}>Gdzie jesteśmy</h3>
							<p className={' text-[1.6rem] text-black'}>Bydgoszcz, Lisia 40, 85-001</p>
						</div>
						<div
							className={
								styles.data__box + ' flex flex-col items-center justify-center w-136 h-80 rounded-xl bg-(--white)'
							}>
							<h3 className={styles.data__title + ' text-[2.4rem] text-(--navigationBackground)'}>Telefon</h3>
							<p className={' text-[1.6rem] text-black'}>+48 123 123 123</p>
						</div>
						<div
							className={
								styles.data__box + ' flex flex-col items-center justify-center w-136 h-80 rounded-xl bg-(--white)'
							}>
							<h3 className={styles.data__title + ' text-[2.4rem] text-(--navigationBackground)'}>Email</h3>
							<p className={' text-[1.6rem] text-black'}>wordlexinfo@outlook.com</p>
						</div>
					</div>
					<ContactForm />
				</div>
				<div
					className={
						styles.call__us__box +
						' flex flex-col justify-center items-center w-full h-200 text-center bg-(--navigationBackground)'
					}>
					<div className=' wrapper flex flex-col items-center'>
						<h2 className={styles.call__us__title + ' text-[4.2rem]  font-medium text-(--links)'}>Zadzwoń Do Nas</h2>
						<h3 className={styles.call__us__subtitle + ' text-[2.8rem] font-medium text-(--links) text-pretty'}>
							Chcesz o coś zapytać, podzielić sie opinią lub masz pytania dotyczące aplikacji?
						</h3>
						<p className={styles.call__us__info + ' text-[2rem] font-medium text-(--links) text-pretty '}>
							Chętnie usłyszymy Twój głos! Zadzwoń do naszego działu technicznego w dni robocze między 9 a 17 pod numer
							+48 124 125 126.
						</p>
						<p className={styles.call__us__info + ' text-[2rem] font-medium text-(--links) text-pretty '}>
							Jeśli nie odbieramy, zostaw wiadomość - oddzwonimy najszybciej, jak to możliwe!
						</p>
					</div>
				</div>
				<div className='wrapper'>
					<ContactMap />
				</div>
			</section>
			<footer className=' bg-(--navigationBackground) text-(--white)'>
					<Footer />
			</footer>
		</>
	)
}
