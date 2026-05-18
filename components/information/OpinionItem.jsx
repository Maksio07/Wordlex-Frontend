import { motion } from 'framer-motion'
import Image from 'next/image'
import { opinions } from '../../data/about-us-data'
import Note from './Note'
import Confirm from '../icons/Opinions/Confirm'
import useWindowSize from '../../hooks/useWindowSize'
import styles from './about-us-opinions.module.css'

export default function OpinionItem({ currentId }) {
	const { width } = useWindowSize()

	let opinionsToShowArr = [
		opinions[currentId === opinions.length ? 0 : currentId],
		opinions[currentId + 1 === opinions.length ? 0 : currentId + 1],
		opinions[currentId + 2 === opinions.length ? 0 : currentId + 2 >= opinions.length ? 1 : currentId + 2],
	]

	if (width < 1150 && width > 770) {
		opinionsToShowArr = [
			opinions[currentId === opinions.length ? 0 : currentId],
			opinions[currentId + 1 === opinions.length ? 0 : currentId + 1],
		]
	} else if (width < 770) {
		opinionsToShowArr = [opinions[currentId === opinions.length ? 0 : currentId]]
	}

	return (
		<>
			{opinionsToShowArr.map(opinion => {
				let boxStyles = styles.box + ' flex flex-col items-center w-160 h-112 rounded-[.8rem] bg-(--aboutUsCardBg)'

				return (
					<motion.div
						className={boxStyles}
						key={opinion.id}
						id={opinion.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { duration: 0.3 } }}>
						<div className={styles.box__top + ' flex items-center justify-evenly w-full'}>
							<Image
								src={opinion.img}
								alt={opinion.alt}
								loading='eager'
								className={styles.img + ' h-48 w-48 rounded-[100%]'}
							/>
							<div>
								<h3 className={styles.name + ' text-[2.2rem] font-medium text-(--title) text-center'}>
									{opinion.title}
								</h3>
								<p className={styles.description + ' text-[1.4rem] font-medium text-(--title) text-center'}>
									{opinion.userDescription}
								</p>
							</div>
							<Confirm width={'2rem'} height={'2rem'} stroke={'#1ace23e3'} customStyles={styles.confirm__icon} />
						</div>
						<Note />
						<p className=' text-[1.4rem] text-(--title) text-center text-pretty'>{opinion.opinion}</p>
					</motion.div>
				)
			})}
		</>
	)
}
