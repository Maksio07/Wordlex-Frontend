import Link from 'next/link'
import styles from './header.module.css'

export default function Header() {
	return (
		<header className={styles.header + ' w-screen h-screen'}>
			<div className='wrappper h-full'>
				<div className={styles.hero + ' relative h-full'}>
					<div className={styles.hero__shadow}></div>
					<div className='flex flex-col items-center justify-center h-[80%]'>
						<h1 className={styles.title + ' text-6xl font-bold text-(--links)'}>
							Wordlex - i nauka robi się przyjemniejsza!
						</h1>
						<p className={styles.info__text + ' text-4xl font-medium text-(--links)'}>
							Ułatw sobie naukę języków obcych razem z nami!
						</p>
						<button
							type='button'
							aria-label='Start'
							className={styles.start__btn + ' p-[2.4rem] text-[2.2rem] text-(--links)'}>
							<Link href='/login'>Zacznij</Link>
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}
