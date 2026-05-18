import { createPortal } from 'react-dom'
import { useContext, useState } from 'react'
import { UserAuthenticationContext } from '../../store/UserAuthenticationContext'
import { ModeContext } from '../../store/modeContext'
import useUser from '../../hooks/useUser'
import useCsrf from '../../hooks/useCsrf'
import useHTTP from '../../hooks/useHTTP'
import SearchEngine from '../UI/SearchEngine'
import ErrorMessage from '../UI/ErrorMessage'
import TopicItem from './TopicItem'
import UlList from '../UI/UlList'
import InformationText from '../UI/InformationText'
import DeleteModal from '../UI/DeleteModal'
import styles from './topics.module.css'

export default function TopicsList({
	languageId,
	onOpenModal,
	topics,
	onLoadTopics,
	loading,
	onHandleEditModal,
	onSetTopics,
	topicWords,
}) {
	const { csrfToken } = useCsrf()
	const { user } = useUser()
	const { setError, sendRequest, error } = useHTTP()
	const isAuthCtx = useContext(UserAuthenticationContext)
	const modeCtx = useContext(ModeContext)
	const [deleteModalIsOpen, setDeleetModalIsOpen] = useState(false)
	const [topicToDeleteId, setTopicToDeleteId] = useState('')
	const [langIdInt, setLangIdInt] = useState('')

	const handleDeleteModal = () => {
		setDeleetModalIsOpen(prevState => !prevState)
		modeCtx.handleShadowIsActive(prevState => !prevState)
	}

	const handleDeleteTopicId = e => {
		setTopicToDeleteId(e.target.closest('li').id)
		setLangIdInt(e.target.closest('li').getAttribute('datatype'))
		handleDeleteModal()
	}

	async function deleteTopic(e) {
		const resData = await sendRequest(`/profile/${user.id}/${languageId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			body: JSON.stringify({
				user_id: user.id,
				language_id_int: langIdInt,
				topic_id: topicToDeleteId,
			}),
			credentials: 'include',
		})

		if (resData !== undefined) {
			isAuthCtx.handleConfirmMessage('Temat został usunięty.')
			onLoadTopics()
			handleDeleteModal()
		} else {
			setError('Coś poszło nie tak, spróbuj ponownie.')
		}
	}

	function handleFilteredTopics(value) {
		onSetTopics(value)
	}

	return (
		<>
			<SearchEngine
				data={topics}
				onSetFilteredData={handleFilteredTopics}
				placeholder={'Szukaj w tematach'}
				onLoad={onLoadTopics}
				topics={true}
			/>
			{error && <ErrorMessage message={error} />}
			<UlList
				customBtnStyles={`h-48 w-100 max-[320px]:w-88 ${styles.addBtn}`}
				buttonText={'Dodaj Temat'}
				btnIconIsActive={true}
				onClick={onOpenModal}
				loading={loading}
				loadingMessage={'Ładuję tematy, proszę czekać'}>
				{topics?.length === 0 && <InformationText message={'Nie masz jeszcze dodanych tematów.'} />}
				<TopicItem
					topics={topics}
					languageId={languageId}
					onDeleteTopic={handleDeleteTopicId}
					onHandleEditModal={onHandleEditModal}
					topicWords={topicWords}
				/>
			</UlList>
			{deleteModalIsOpen &&
				createPortal(
					<DeleteModal
						onDelete={deleteTopic}
						onClose={handleDeleteModal}
						title={'Czy na pewno chcesz usunąć ten temat?'}
					/>,
					document.body
				)}
		</>
	)
}
