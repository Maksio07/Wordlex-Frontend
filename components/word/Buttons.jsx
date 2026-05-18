import { useState } from 'react'
import Link from 'next/link'
import BackBtn from '../UI/BackBtn'
import ProgressBar from '../UI/ProgressBar'
import styles from './word.module.css'

export default function Buttons({ words, userId, languageId, topicId, currentWord }) {
	const currentWordIdIndex = words.findIndex(word => currentWord.word_id === word.word_id)
	const [currentIndex, setCurrentIndex] = useState(currentWordIdIndex)

	const nextIdx = (currentIndex + 1) % words.length
	const prevIdx = currentIndex === 0 ? words.length - 1 : currentIndex - 1

	function handleNext() {
		setCurrentIndex(nextIdx)
	}

	function handlePrev() {
		setCurrentIndex(prevIdx)
	}

	return (
		<>
			<ProgressBar data={words} currentIndex={currentIndex} />
			<div className={`${styles.buttons_box} flex flex-col justify-center items-center w-full flex-wrap`}>
				<div className={`flex justify-center items-center gap-24`}>
					<Link
						href={
							currentWordIdIndex === 0 ? '' : `/profile/${userId}/${languageId}/${topicId}/${words[prevIdx].word_id}`
						}
						onClick={currentWordIdIndex === 0 ? '' : handlePrev}
						className={`${currentWordIdIndex === 0 ? styles.disabled : styles.navigation_btn}`}
						aria-label='Poprzednie'>
						Poprzednie
					</Link>
					<Link
						href={
							currentWordIdIndex === words.length - 1
								? ''
								: `/profile/${userId}/${languageId}/${topicId}/${words[nextIdx].word_id}`
						}
						onClick={currentWordIdIndex === words.length - 1 ? '' : handleNext}
						className={`${currentWordIdIndex === words.length - 1 ? styles.disabled : styles.navigation_btn}`}
						aria-label='Następne'>
						Następne
					</Link>
				</div>

				<div className={`flex justify-center items-center gap-12`}>
					<BackBtn href={`/profile/${userId}/${languageId}/${topicId}`} text={'Wróć do tematu'} />
					{currentWordIdIndex === words.length - 1 && (
						<Link
							href={`/profile/${userId}/${languageId}/${topicId}/${words[0].word_id}`}
							className={`${styles.navigation_btn} flex items-center`}
							aria-label='Zacznij od nowa'>
							Zacznij od nowa
						</Link>
					)}
				</div>
			</div>
		</>
	)
}
