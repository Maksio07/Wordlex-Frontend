'use client'

import { use, useState, useEffect, useContext } from 'react'
import { UserAuthenticationContext } from '../../../../../../store/UserAuthenticationContext'
import { ModeContext } from '../../../../../../store/modeContext'
import useHTTP from '../../../../../../hooks/useHTTP'
import useCsrf from '../../../../../../hooks/useCsrf'
import languages from '../../../../../../data/languages.json'
import Loading from '../../../../../../components/UI/Loading'
import WordsList from '../../../../../../components/words/WordsList'
import AddModal from '../../../../../../components/words/AddModal'
import ErrorMessage from '../../../../../../components/UI/ErrorMessage'
import ConfirmMessage from '../../../../../../components/UI/ConfirmMessage'
import BackBtn from '../../../../../../components/UI/BackBtn'
import styles from './topic.module.css'
import EditModal from '../../../../../../components/words/EditModal'

export default function Topic({ params }) {
	const { topic: topicId, language: languageId, userProfile: userId } = use(params)
	const [words, setWords] = useState([])
	const [topicData, setTopicData] = useState(null)
	const [wordToEdit, setWordToEdit] = useState('')
	const [addModalIsOpen, setAddModalIsOpen] = useState(false)
	const [editModalIsOpen, setEditModalIsOpen] = useState(false)
	const isAuthCtx = useContext(UserAuthenticationContext)
	const modeCtx = useContext(ModeContext)

	const { csrfToken } = useCsrf()
	const { error, sendRequest, setError, pending } = useHTTP()

	const languageData = languages.find(lang => lang.language_id === languageId)

	async function loadData() {
		const resData = await sendRequest(`/profile/${userId}/${languageId}/${topicId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			credentials: 'include',
		})

		if (resData) {
			setTopicData({
				languageId: resData.language_id,
				topicId: resData.topic_id,
				topicIdInt: resData.topic_id_int,
				languageIdInt: resData.language_id_int,
				topicData: resData.topicData,
			})
			await loadWords()
		} else {
			setError('Coś poszło nie tak, spróbój ponownie.')
		}
	}

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
	}

	useEffect(() => {
		loadData()
	}, [])

	function handleAddModal() {
		setAddModalIsOpen(prevState => !prevState)
		modeCtx.handleShadowIsActive(prevState => !prevState)
	}

	function handleEditModal(value) {
		setEditModalIsOpen(prevState => !prevState)
		modeCtx.handleShadowIsActive(prevState => !prevState)
		setWordToEdit(value)
	}

	if (!topicData) {
		return <Loading message={'Ładuję dane...'} />
	}

	return (
		<section>
			<div className='wrapper flex flex-col justify-center items-center'>
				<h1 className={`${styles.title} text-center text-4xl font-semibold text-(--title)`}>{languageData.name}</h1>
				<p className={`${styles.subtitle} text-center text-3xl font-medium text-(--title)`}>
					{topicData.topicData.topic_name} - {topicData.topicData.topic_polish_name}
				</p>
				<BackBtn text={'Wróć do tematów'} href={`/profile/${userId}/${languageId}`} customStyles={styles.back_btn}/>
				{isAuthCtx.confirmMessage && <ConfirmMessage message={isAuthCtx.confirmMessage} />}
				{error && <ErrorMessage message={error} />}
				<WordsList
					words={words}
					onLoadWords={loadWords}
					onSetWords={setWords}
					onOpenAddModal={handleAddModal}
					topicData={topicData}
					onOpenEditModal={handleEditModal}
					loading={pending}
				/>
				{addModalIsOpen && (
					<AddModal
						onCloseAddModal={handleAddModal}
						topicData={topicData}
						languageData={languageData}
						onLoadWords={loadWords}
					/>
				)}
				{editModalIsOpen && (
					<EditModal
						onCloseEditModal={handleEditModal}
						languageData={languageData}
						topicData={topicData}
						onLoadWords={loadWords}
						wordToEdit={wordToEdit}
					/>
				)}
			</div>
		</section>
	)
}
