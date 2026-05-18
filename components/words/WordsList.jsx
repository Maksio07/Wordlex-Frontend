import { createPortal } from 'react-dom'
import { useContext, useState } from 'react'
import { UserAuthenticationContext } from '../../store/UserAuthenticationContext'
import { ModeContext } from '../../store/modeContext'
import useCsrf from '../../hooks/useCsrf'
import useHTTP from '../../hooks/useHTTP'
import SearchEngine from '../UI/SearchEngine'
import UlList from '../UI/UlList'
import WordItem from './WordItem'
import ErrorMessage from '../UI/ErrorMessage'
import InformationText from '../UI/InformationText'
import DeleteModal from '../UI/DeleteModal'

export default function WordsList({
	words,
	onLoadWords,
	onSetWords,
	onOpenAddModal,
	topicData,
	onOpenEditModal,
	loading,
}) {
	const { csrfToken } = useCsrf()
	const { setError, sendRequest, error } = useHTTP()
	const isAuthCtx = useContext(UserAuthenticationContext)
	const modeCtx = useContext(ModeContext)
	const [deleteModalIsOpen, setDeleetModalIsOpen] = useState(false)
	const [wordToDelete, setWordToDelete] = useState('')

	const handleDeleteModal = () => {
		setDeleetModalIsOpen(prevState => !prevState)
		modeCtx.handleShadowIsActive(prevState => !prevState)
	}

	const handleDeleteWord = e => {
		setWordToDelete(e.target.closest('li'))
		handleDeleteModal()
	}

	async function deleteWord(e) {
		const message = wordToDelete.lastChild.firstChild.firstChild.innerText

		const resData = await sendRequest(
			`/profile/${topicData.topicData.user_id}/${topicData.languageId}/${topicData.topicId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'CSRF-Token': csrfToken,
				},
				body: JSON.stringify({
					word_id: wordToDelete.id,
					user_id: topicData.topicData.user_id,
					language_id_int: topicData.languageIdInt,
					topic_id_int: topicData.topicIdInt,
				}),
				credentials: 'include',
			}
		)

		if (resData !== undefined) {
			isAuthCtx.handleConfirmMessage(`Słowo ${message} zostało usunięte.`)
			onLoadWords()
			handleDeleteModal()
		} else {
			setError('Coś poszło nie tak, spróbuj ponownie.')
		}
	}

	function handleFilteredWords(value) {
		onSetWords(value)
	}

	return (
		<>
			<SearchEngine
				placeholder={'Szukaj w słowach'}
				data={words}
				onLoad={onLoadWords}
				onSetFilteredData={handleFilteredWords}
				words={true}
			/>
			{error && <ErrorMessage message={error} />}
			<UlList
				buttonText={'Dodaj Słowo'}
				btnIconIsActive={true}
				customBtnStyles={' w-[32rem] h-42 max-[390px]:w-104 max-[325px]:w-90'}
				onClick={onOpenAddModal}
				loading={loading}
				loadingMessage={'Ładuję słowa, proszę czekać'}>
				{words?.length === 0 && <InformationText message={'Nie masz jeszcze dodanych słów.'} />}
				<WordItem words={words} topicData={topicData} onDelete={handleDeleteWord} onOpenEditModal={onOpenEditModal} />
			</UlList>
			{deleteModalIsOpen &&
				createPortal(
					<DeleteModal
						onDelete={deleteWord}
						onClose={handleDeleteModal}
						title={'Czy na pewno chcesz usunąć dane słowo?'}
					/>,
					document.body
				)}
		</>
	)
}
