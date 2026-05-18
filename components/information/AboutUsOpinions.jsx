'use client'

import { useState } from 'react'
import { opinions } from '../../data/about-us-data'
import OpinionItem from './OpinionItem'
import styles from './about-us-opinions.module.css'

export default function AboutUsOpinions() {
	const [currentId, setCurrentId] = useState(0)
	const opinionsLength = opinions.length

	const goToNextOpinion = () => {
		setCurrentId(currentId === opinionsLength - 1 ? 0 : currentId + 1)
	}

	const goToPreviousOpinion = () => {
		setCurrentId(currentId === 0 ? opinionsLength - 1 : currentId - 1)
	}

	return (
		<div className='relative flex flex-col justify-center'>
			<h2 className={styles.title + ' text-(--title) text-center text-6xl font-bold'}>Opinie</h2>
			<div className={styles.container + ' flex items-center justify-center '}>
				<OpinionItem currentId={currentId} />
				<button
					aria-label='previous'
					className={styles.button__left + ' absolute font-medium text-[4.8rem] text-(--title) cursor-pointer'}
					onClick={goToPreviousOpinion}>
					<span>&#60;</span>
				</button>
				<button
					aria-label='next'
					className={styles.button__right + ' absolute font-medium text-[4.8rem] text-(--title) cursor-pointer'}
					onClick={goToNextOpinion}>
					<span>&#62;</span>
				</button>
			</div>
		</div>
	)
}
