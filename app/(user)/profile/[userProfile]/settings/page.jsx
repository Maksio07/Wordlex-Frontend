'use client'

import { use, useEffect, useState, useContext } from 'react'
import PersonalData from '../../../../../components/settings/PersonalData/PersonalData'
import { UserAuthenticationContext } from '../../../../../store/UserAuthenticationContext'
import useHTTP from '../../../../../hooks/useHTTP'
import useCsrf from '../../../../../hooks/useCsrf'
import Loading from '../../../../../components/UI/Loading'
import ErrorMessage from '../../../../../components/UI/ErrorMessage'
import ConfirmMessage from '../../../../../components/UI/ConfirmMessage'
import Stats from '../../../../../components/settings/Stats/Stats'
import styles from './settings.module.css'

export default function Settings({ params }) {
	const [user, setUser] = useState([])
	const [activeCategory, setActiveCategory] = useState('personalData')
	const { csrfToken } = useCsrf()
	const { error, sendRequest, setError, pending } = useHTTP()
	const { userProfile: userId } = use(params)
	const isAuthCtx = useContext(UserAuthenticationContext)

	async function loadUser() {
		const resData = await sendRequest(`/profile/${userId}/settings`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			credentials: 'include',
		})

		if (resData) {
			setUser(resData)
		} else {
			setError('Coś poszło nie tak, spróbój ponownie.')
		}
	}

	useEffect(() => {
		loadUser()
	}, [])

	function handleActiveBtn(e) {
		const clickedBtn = e.target.closest('li').id
		setActiveCategory(clickedBtn)
	}

	if (!user) return <Loading message={'Ładuje dane...'} />

	return (
		<section className={`${styles.settings}`}>
			<div className='wrapper flex flex-col items-center'>
				<h1 className={`${styles.title} text-center text-5xl font-semibold text-(--title)`}>Ustawienia Konta</h1>
				<ConfirmMessage message={isAuthCtx.confirmMessage} />
				{error && <ErrorMessage message={error} />}
				{pending ? (
					<Loading message={'Ładuję dane'} />
				) : (
					<div
						className={`${styles.settings__box} flex h-400 w-full max-[675px]:h-458 max-[500px]:h-600`}>
						<div
							className={`${styles.left} flex flex-col items-center w-[25%] h-96 bg-(--settings) `}>
							<h2 className={`${styles.left__title} text-center text-3xl font-semibold text-(--title)`}>
								Zarządzanie Kontem
							</h2>
							<ul className='flex flex-col w-full' onClick={handleActiveBtn}>
								<li
									className={`${styles.category} ${activeCategory === 'personalData' && styles.active__category}`}
									id='personalData'>
									Dane Personalne
								</li>
								<li
									className={`${styles.category} ${activeCategory === 'stats' && styles.active__category}`}
									id='stats'>
									Statystyki
								</li>
							</ul>
						</div>
						{activeCategory === 'personalData' && <PersonalData user={user} userId={userId} />}
						{activeCategory === 'stats' && <Stats user={user} error={error}/>}
					</div>
				)}
			</div>
		</section>
	)
}
