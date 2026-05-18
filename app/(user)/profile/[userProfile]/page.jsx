'use client'
import { useState, useContext, useEffect } from 'react'
import { ModeContext } from '../../../../store/modeContext'
import { UserAuthenticationContext } from '../../../../store/UserAuthenticationContext'
import useUser from '../../../../hooks/useUser'
import useCsrf from '../../../../hooks/useCsrf'
import ErrorMessage from '../../../../components/UI/ErrorMessage'
import Loading from '../../../../components/UI/Loading'
import LanguagesList from '../../../../components/languages/LanguagesList'
import useHTTP from '../../../../hooks/useHTTP'
import ChooseLanguageModal from '../../../../components/languages/ChooseLanguageModal'
import ConfirmMessage from '../../../../components/UI/ConfirmMessage'
import styles from './profile.module.css'

export default function UserProfile() {
	const { user, error } = useUser()
	const { sendRequest, setError, pending } = useHTTP()
	const [languages, setLanguages] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { csrfToken } = useCsrf()
	const modeCtx = useContext(ModeContext)
	const isAuthCtx = useContext(UserAuthenticationContext)

	const loadLanguages = async () => {
		const data = await sendRequest(`/profile/${user.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			credentials: 'include',
		})

		if (data) {
			setLanguages(data.languages)
		} else {
			setError('Coś poszło nie tak, spróbój ponownie.')
		}
	}

	useEffect(() => {
		user && loadLanguages()
	}, [user])

	function handleModalOpening() {
		setIsModalOpen(prevState => !prevState)
		modeCtx.handleShadowIsActive(prevState => !prevState)
	}

	if (!user) return <Loading message={'Ładuję dane użytkownika...'} />
	return (
		<section>
			<div className='wrapper relative flex flex-col items-center w-full'>
				{error && <ErrorMessage message={error} />}
				{!error && (
					<>
						<h1 className={styles.title + ' text-center text-5xl font-semibold text-(--title)'}>
							Cześć, {user.user_name}!
						</h1>
						<p className={styles.welcome__text + ' text-center text-4xl font-medium text-(--title)'}>
							Zacznijmy razem ulepaszać Twoje umiejętności językowe.
						</p>
						{isAuthCtx.confirmMessage && <ConfirmMessage message={isAuthCtx.confirmMessage} customStyles={' w-full'} />}
						<LanguagesList
							onLoadLanguages={loadLanguages}
							languages={languages}
							user={user}
							onHandleModalOpening={handleModalOpening}
							loading={pending}
						/>
					</>
				)}
				{isModalOpen && (
					<ChooseLanguageModal onHandleModal={handleModalOpening} user={user} onLoadLanguages={loadLanguages} />
				)}
			</div>
		</section>
	)
}
