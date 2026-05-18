'use client'

import AboutUsTeam from '../../../components/information/AboutUsTeam'
import AboutUsOpinions from '../../../components/information/AboutUsOpinions'
import TextItem from '../../../components/information/TextItem'
import styles from './about.module.css'

export default function AboutUs() {
	return (
		<section className='w-screen'>
			<div className={styles.hero + ' relative flex h-256 z-1'}>
				<div className={styles.hero__shadow}></div>
				<div className='wrapper relative'>
					<h1 className={styles.title + ' text-(--links) text-center text-6xl font-bold'}>O nas</h1>
					<h2 className={styles.title + ' text-(--links) text-center text-4xl font-medium'}>
						Jesteśmy <span className='text-(--submitBtnBg)'>Wordlex</span> - i łączy nas nauka
					</h2>
					<div className={styles.text__container + ' flex flex-col justify-center flex-wrap h-[75%] w-full'}>
						<TextItem customStyles={styles.text + ' self-start'} duration={1}>
							Jesteśmy zespołem pasjonatów języków obcych, których celem jest pomaganie w nauce języków obcych za darmo.
							Niezaleźnie od tego, czy chcesz utrwalić swoje umiejętności komunikacyjne czy opanować podstawy, jesteśmy
							tutaj, aby pomóc Ci na każdym kroku.
						</TextItem>
						<TextItem customStyles={styles.text + ' self-end'} duration={2}>
							Nasze nowoczesne metody nauczania łączą sprawdzone techniki z innowacyjnymi narzędziami, aby zapewnić
							skuteczną i przyjemną naukę. Dzięki temu, pierwsze efekty można zobaczyć już po 7 dniach. Wystarczy tylko
							założyć konto i można już zaczynać naukę poprzez dodawanie i powtarzanie słówek.
						</TextItem>
						<TextItem customStyles={styles.text + ' self-start'} duration={3}>
							Dlaczego warto? Bo dzięki nam będziesz się uczyć własnym tempem, podtrzymasz motywację do nauki, uczysz
							się gdziekolwiek chcesz i najważniejsze - bez ograniczeń.
						</TextItem>
						<TextItem customStyles={styles.text + ' self-end'} duration={4}>
							Dołącz do nas i zacznij swoją językową podróż już dziś. Razem przekroczymy wszelkie bariery - zarówno
							językowe, jak i kulturowe!
						</TextItem>
					</div>
					<AboutUsTeam />
					<AboutUsOpinions />
				</div>
			</div>
		</section>
	)
}
