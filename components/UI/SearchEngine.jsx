import { useState } from 'react'
import Search from '../icons/Search'
import styles from './ui.module.css'

export default function SearchEngine({
	placeholder,
	data,
	onSetFilteredData,
	customStyles,
	onLoad,
	topics = false,
	words = false,
}) {
	const [enteredData, setEnteredData] = useState('')

	function filterData(e) {
		const query = e.target.value
		setEnteredData(query)

		if (query.trim() === '') {
			onLoad()
			onSetFilteredData(data)
			return
		}

		const matchedWord = findData(query, data)
		onSetFilteredData(matchedWord)
	}

	function findData(wordToMatch) {
		return data.filter(item => {
			const regex = new RegExp(wordToMatch, 'gi')
			if (topics) {
				return item.topic_name?.match(regex) || item.topic_polish_name?.match(regex)
			} else if (words) {
				return item.word_name?.match(regex) || item.word_polish_name?.match(regex)
			}
		})
	}

	return (
		<div className={`${styles.search} flex justify-center items-center  ${customStyles}`}>
			<span className={`${styles.search_icon}`}>
				<Search width={'2.4rem'} height={'2.4rem'} stroke={'var(--title)'} />
			</span>
			<input
				type='text'
				aria-label='Szukaj'
				name='search'
				id='search'
				placeholder={placeholder}
				value={enteredData}
				onChange={filterData}
				className={`${styles.search_input} relative`}
			/>
		</div>
	)
}
