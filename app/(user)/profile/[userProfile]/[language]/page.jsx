'use client'

import { use, useState, useContext, useEffect } from 'react'
import useHTTP from '../../../../../hooks/useHTTP'
import useCsrf from '../../../../../hooks/useCsrf'
import Image from 'next/image'
import { ModeContext } from '../../../../../store/modeContext'
import { UserAuthenticationContext } from '../../../../../store/UserAuthenticationContext'
import TopicsList from '../../../../../components/topics/TopicsList'
import languages from '../../../../../data/languages.json'
import Loading from '../../../../../components/UI/Loading'
import AddModal from '../../../../../components/topics/AddModal'
import EditModal from '../../../../../components/topics/EditModal'
import ConfirmMessage from '../../../../../components/UI/ConfirmMessage'
import ErrorMessage from '../../../../../components/UI/ErrorMessage'
import BackBtn from '../../../../../components/UI/BackBtn'
import styles from './language.module.css'

export default function Language({ params }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isEditModalOpen, setEditModalIsOpen] = useState(false)
	const [topicToEdit, setTopicToEdit] = useState('')
	const [topics, setTopics] = useState([])
	const [languageDBData, setLanguageDBData] = useState('')
	const { language, userProfile: user } = use(params)

	const languageData = languages.find(lang => lang.language_id === language)

	const { csrfToken } = useCsrf()
	const { error, sendRequest, setError, pending } = useHTTP()
	const modeCtx = useContext(ModeContext)
	const isAuthCtx = useContext(UserAuthenticationContext)

	async function loadTopics() {
		const resData = await sendRequest(`/profile/${user}/${language}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			credentials: 'include',
		})

		if (resData) {
			setTopics(resData.topics)
			setLanguageDBData({ languageIdInt: resData.language_id, topicWords: resData.topicWords })
		} else {
			setError('Coś poszło nie tak, spróbój ponownie.')
		}
	}

	useEffect(() => {
		user && loadTopics()
	}, [user])

	function handleAddModal() {
		setIsModalOpen(prevState => !prevState)
		modeCtx.handleShadowIsActive(prevState => !prevState)
	}

	function handleEditModal(topic) {
		setTopicToEdit(topic)
		setEditModalIsOpen(prevState => !prevState)
		modeCtx.handleShadowIsActive(prevState => !prevState)
	}

	if (!user) return <Loading message={'Ładuję dane...'} />

	return (
		<section>
			<div className='wrapper flex flex-col justify-center items-center'>
				<div className={`${styles.titleBox} flex justify-center items-center`}>
					<Image src={languageData.img_path} alt={`Flaga ${languageData.name}`} width={'42'} height={'32'} />
					<h1 className={`${styles.title} text-center text-4xl font-semibold text-(--title)`}>{languageData.name}</h1>
				</div>
				<BackBtn href={`/profile/${user}`} text={'Wróć do języków'} customStyles={styles.back_btn}/>
				{isAuthCtx.confirmMessage && <ConfirmMessage message={isAuthCtx.confirmMessage} />}
				{error && <ErrorMessage message={error} />}
				<TopicsList
					languageId={language}
					topics={topics}
					onOpenModal={handleAddModal}
					onLoadTopics={loadTopics}
					loading={pending}
					onHandleEditModal={handleEditModal}
					onSetTopics={setTopics}
					topicWords={languageDBData.topicWords}
				/>
				{isModalOpen && (
					<AddModal
						onCloseModal={handleAddModal}
						languageData={languageData}
						languageIdInt={languageDBData.languageIdInt}
						onLoadTopics={loadTopics}
					/>
				)}
				{isEditModalOpen && (
					<EditModal
						onCloseEditModal={handleEditModal}
						languageIdInt={languageDBData.languageIdInt}
						languageData={languageData}
						onLoadTopics={loadTopics}
						topicToEdit={topicToEdit}
					/>
				)}
			</div>
		</section>
	)
}
