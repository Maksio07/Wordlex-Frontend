'use client'
import { use, useState, useEffect } from 'react'
import { motion } from 'motion/react'
import useHTTP from '../../../../../../../hooks/useHTTP'
import useCsrf from '../../../../../../../hooks/useCsrf'
import Loading from '../../../../../../../components/UI/Loading'
import Card from '../../../../../../../components/word/Card'
import ErrorText from '../../../../../../../components/UI/ErrorMessage'
import Buttons from '../../../../../../../components/word/Buttons'

export default function Word({ params }) {
	const [words, setWords] = useState([])
	const [currentWord, setCurrentWord] = useState(null)
	const { topic: topicId, language: languageId, userProfile: userId, word: wordId } = use(params)

	const { csrfToken } = useCsrf()
	const { error, sendRequest, setError, pending } = useHTTP()

	async function loadWords() {
		const resData = await sendRequest(`/profile/${userId}/${languageId}/${topicId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			credentials: 'include',
		})

		if (resData) {
			setWords(resData.words)
		} else {
			setError('Coś poszło nie tak, spróbój ponownie.')
		}

		const currWord = resData.words.find(word => word.word_id === wordId)
		setCurrentWord(currWord)
	}

	useEffect(() => {
		loadWords()
	}, [])

	if (currentWord === null || pending) {
		return <Loading message={'Ładuję dane...'} />
	}

	return (
		<motion.section initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5 } }}>
			<div className='wrapper flex flex-col items-center w-full'>
				<Buttons words={words} userId={userId} languageId={languageId} topicId={topicId} currentWord={currentWord} />
				{error ? <ErrorText message={error} /> : <Card currentWord={currentWord} languageId={languageId} />}
			</div>
		</motion.section>
	)
}
