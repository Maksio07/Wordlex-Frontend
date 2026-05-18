'use client'
import { createPortal } from 'react-dom'
import { useContext, useState } from 'react'
import { UserAuthenticationContext } from '../../store/UserAuthenticationContext'
import { ModeContext } from '../../store/modeContext'
import useCsrf from '../../hooks/useCsrf'
import useHTTP from '../../hooks/useHTTP'
import UlList from '../UI/UlList'
import LanguageItem from './LanguageItem'
import ErrorMessage from '../UI/ErrorMessage'
import InformationText from '../UI/InformationText'
import DeleteModal from '../UI/DeleteModal'

export default function LanguagesList({ onLoadLanguages, languages, user, onHandleModalOpening, loading }) {
	const { csrfToken } = useCsrf()
	const { sendRequest, setError, error } = useHTTP()
	const [deleteModalIsOpen, setDeleetModalIsOpen] = useState(false)
	const [langToDeleteId, setLangToDeleteId] = useState('')
	const isAuthCtx = useContext(UserAuthenticationContext)
	const modeCtx = useContext(ModeContext)

	const handleDeleteModal = () => {
		setDeleetModalIsOpen(prevState => !prevState)
		modeCtx.handleShadowIsActive(prevState => !prevState)
	}

	const handleDeleteLangId = e => {
		setLangToDeleteId(e.target.closest('li').id)
		handleDeleteModal()
	}

	async function deleteLanguage(e) {
		const data = await sendRequest(`/profile/${user.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			body: JSON.stringify({
				language_id: langToDeleteId,
				user_id: user.id,
			}),
			credentials: 'include',
		})

		if (data !== undefined) {
			isAuthCtx.handleConfirmMessage(`Język został usunięty pomyślnie.`)
			onLoadLanguages()
			handleDeleteModal()
		} else {
			setError('Coś poszło nie tak, spróbuj ponownie.')
		}
	}

	return (
		<>
			{error && <ErrorMessage message={error} />}
			<UlList
				buttonText={'Dodaj Język'}
				onClick={onHandleModalOpening}
				customBtnStyles={' h-120 w-88'}
				loading={loading}
				loadingMessage={'Ładuję języki, proszę czekać'}>
				<LanguageItem languages={languages} user={user} onDeleteLanguage={handleDeleteLangId} />
				{languages?.length === 0 && <InformationText message={'Nie masz jeszcze dodanych języków.'} />}
			</UlList>
			{deleteModalIsOpen &&
				createPortal(
					<DeleteModal
						onDelete={deleteLanguage}
						onClose={handleDeleteModal}
						title={'Czy na pewno chcesz usunąć ten język?'}
					/>,
					document.body
				)}
		</>
	)
}
