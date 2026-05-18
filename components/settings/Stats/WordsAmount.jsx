import { useState, useEffect } from 'react'
import Counter from './Counter'
import styles from './stats.module.css'

export default function WordsAmount({ user }) {
	const [activeLanguage, setActiveLanguage] = useState('all')
	const [activeLanguageWords, setActiveLanguageWords] = useState([])
	const [counterData, setCounterData] = useState(0)
	const maxValue = activeLanguage === 'all' ? user.userWords.length : activeLanguageWords.length

	function handleActiveLanguage(e) {
		const activeLanguageId = e.target.closest('li').id
		const activeLanguageName = e.target.closest('li').ariaLabel

		const wordsToShow = user.userWords.filter(word => word.language_id.toString() === activeLanguageName)

		setActiveLanguage(activeLanguageId)
		setActiveLanguageWords(wordsToShow)
	}

	useEffect(() => {
		setCounterData(0)

		const interval = setInterval(
			() => {
				setCounterData(prev => {
					if (prev >= maxValue) {
						clearInterval(interval)
						return maxValue
					}
					return prev + 1
				})
			},
			counterData < 50 ? 50 : 10
		)

		return () => clearInterval(interval)
	}, [activeLanguage, user.userWords.length, activeLanguageWords.length])

	return (
		<div className={`${styles.words__amount} flex flex-col justify-center items-center w-full h-136`}>
			<h3 className={`${styles.title} text-center text-3xl font-normal text-(--title)`}>Suma dodanych słów</h3>
			<ul className={`flex gap-10 flex-wrap w-full items-center justify-center`}>
				<li
					className={`${styles.language__btn} ${activeLanguage === 'all' && styles.active__btn}`}
					id='all'
					onClick={handleActiveLanguage}>
					Razem
				</li>
				{user.userLanguages.map(lang => {
					return (
						<li
							key={lang.id}
							id={lang.language_id}
							aria-label={lang.id}
							className={`${styles.language__btn} ${
								activeLanguage === lang.language_id && styles.active__btn
							}`}
							onClick={handleActiveLanguage}>
							{lang.language_name}
						</li>
					)
				})}
			</ul>
			<Counter counterData={counterData} maxValue={maxValue} />
		</div>
	)
}
