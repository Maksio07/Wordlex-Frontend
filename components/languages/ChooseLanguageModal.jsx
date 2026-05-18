'use client'

import { useState, useContext } from 'react'
import { motion } from 'motion/react'
import { UserAuthenticationContext } from '../../store/UserAuthenticationContext.jsx'
import LanguagesListItem from './LanguagesListItem'
import AddModalForm from '../UI/AddModalForm.jsx'
import useHTTP from '../../hooks/useHTTP.jsx'
import useCsrf from '../../hooks/useCsrf.jsx'
import LanguagesListOpenHandler from './LanguagesListOpenHandler.jsx'
import ErrorMessage from '../UI/ErrorMessage.jsx'
import styles from './languagesList.module.css'

export default function ChooseLanguageModal({ onHandleModal, user, onLoadLanguages }) {
	const [isLanguagesListOpen, setIsLanguagesListOpen] = useState(false)
	const [selectedLanguage, setSelectedLanguage] = useState('')
	const { error, sendRequest, pending, setError } = useHTTP()
	const { csrfToken } = useCsrf()
	const isAuthCtx = useContext(UserAuthenticationContext)

	function handleLanguageListOpening() {
		setIsLanguagesListOpen(prevState => !prevState)
	}

	function selectLanguage(e) {
		setSelectedLanguage(e.target.closest('li'))
		handleLanguageListOpening()
	}

	async function addLanguage(e) {
		e.preventDefault()

		if (selectedLanguage === '') {
			setError('Język nie jest wybrany.')
			return new Error('Język nie jest wybrany.')
		}

		const data = await sendRequest(`/profile/${user.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			body: JSON.stringify({
				language_name: selectedLanguage.lastChild.innerHTML,
				language_img_path: selectedLanguage.firstChild.src,
				language_id: selectedLanguage.id,
				user_id: user.id,
			}),
			credentials: 'include',
		})

		if (data !== undefined) {
			isAuthCtx.handleConfirmMessage(`Język ${selectedLanguage.lastChild.innerHTML} został dodany pomyślnie.`)
			onHandleModal()
			onLoadLanguages()
		}
	}

	return (
		<AddModalForm
			customStyles={' w-[40rem] h-[20rem]'}
			title={'Wybierz język'}
			buttonCaption={'Dodaj język'}
			onSubmit={addLanguage}
			onClose={onHandleModal}
			saving={pending}>
			{error && <ErrorMessage message={error} customStyles={styles.error__message} />}

			<LanguagesListOpenHandler
				onOpenList={handleLanguageListOpening}
				isLanguagesListOpen={isLanguagesListOpen}
				selectedLanguage={selectedLanguage}
			/>

			{isLanguagesListOpen && (
				<motion.ul
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className={`${styles.languages__list} flex flex-col w-[75%] bg-(--mainBackground) rounded-[.8rem] z-50`}
					onClick={selectLanguage}>
					<LanguagesListItem onSelect={selectLanguage} />
				</motion.ul>
			)}
		</AddModalForm>
	)
}
