import { useState } from 'react'
import Image from 'next/image'
import styles from './word.module.css'

export default function Card({ currentWord, languageId }) {
	const [answerIsOpen, setAnswerIsOpen] = useState(false)
	const currentLanguage = languageId.slice(0, 1).toUpperCase() + languageId.slice(1)

	function handleAnswerISOpen() {
		setAnswerIsOpen(prevState => !prevState)
	}

	return (
		<div className={`${styles.card} flex flex-col items-center`}>
			<div className={`${styles.inner} ${answerIsOpen ? styles.flipped : ''}`}>
				<div className={styles.back}>
					<p className=' absolute top-4 text-2xl'>{currentLanguage}</p>
					<h1 className={`${styles.title} text-black text-4xl font-medium`}>{currentWord.word_name}</h1>
					<p className={`${styles.example} text-black text-2xl text-center`}>{currentWord.word_example}</p>
					<button
						className={`${styles.handleBtn}`}
						aria-label='Pokaż/Ukryj odpowiedź'
						type='button'
						onClick={handleAnswerISOpen}>
						Ukryj odpowiedź
					</button>
				</div>
				<div className={currentWord.word_img_path ? styles.front : `${styles.front} justify-center`}>
					{currentWord.word_img_path ? (
						<Image
							src={`${currentWord.word_img_path}`}
							width={100}
							height={120}
							alt={`Zdjęcie ${currentWord.word_polish_name}`}
							unoptimized
							className={`${styles.img}`}
						/>
					) : (
						''
					)}
					<h1 className={`${styles.title} text-black text-4xl font-medium`}>{currentWord.word_polish_name}</h1>
					<button
						className={styles.handleBtn}
						aria-label='Pokaż/Ukryj odpowiedź'
						type='button'
						onClick={handleAnswerISOpen}>
						Pokaż odpowiedź
					</button>
				</div>
			</div>
		</div>
	)
}
