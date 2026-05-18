'use client'

import { useContext } from 'react'
import { updateUserID } from './actions'
import LoginForm from '../../../components/auth/LoginForm'
import useHTTP from '../../../hooks/useHTTP'
import useCsrf from '../../../hooks/useCsrf'
import { isEmail, isEmpty } from '../../../util/validation'
import { UserAuthenticationContext } from '../../../store/UserAuthenticationContext'
import Loading from '../../../components/UI/Loading'
import ErrorMessage from '../../../components/UI/ErrorMessage'
import ConfirmMessage from '../../../components/UI/ConfirmMessage'
import { useUserDataReceiving } from '../../../hooks/useUserDataReceiving'

export default function Login() {
	const userAuthCtx = useContext(UserAuthenticationContext)
	const { enteredData, handleEnteredData } = useUserDataReceiving({ email: '', password: '' })
	const { pending, error, setError, sendRequest } = useHTTP()
	const { csrfToken } = useCsrf()

	async function loginUser(e) {
		e.preventDefault()

		if (!isEmail(enteredData.email)) {
			setError('Podany email nie odpowiada formatowi tekst@tekst.domena.')
			return
		} else if (isEmpty(enteredData.email || enteredData.password)) {
			setError('Wszystkie pola powinny być uzupełnione.')
			return
		} else {
			setError('')
		}

		const resData = await sendRequest('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			body: JSON.stringify({
				user_email: enteredData.email,
				user_password: enteredData.password,
			}),
			credentials: 'include',
		})

		if (resData !== undefined) {
			userAuthCtx.handleToken(resData.token)
			userAuthCtx.handleUser(resData.id_int)
			userAuthCtx.handleConfirmMessage('Jesteś zalogowany/-a!')
		}

		updateUserID(resData.id_int)
	}

	return (
		<>
			{pending && <Loading message={'Loguję użytkownika...'} />}
			{!pending && (
				<section className='auth w-screen'>
					<div className='wrapper auth-form '>
						{error && <ErrorMessage message={error} />}
						{userAuthCtx.confirmMessage && <ConfirmMessage message={userAuthCtx.confirmMessage} />}
						<LoginForm onGetUserData={handleEnteredData} userData={enteredData} onLogin={loginUser} />
					</div>
				</section>
			)}
		</>
	)
}
