'use client'

import { useContext } from 'react'
import { redirect } from 'next/navigation'
import useHTTP from '../../../hooks/useHTTP'
import { isEmail, isEmpty, canBePassword } from '../../../util/validation'
import { UserAuthenticationContext } from '../../../store/UserAuthenticationContext'
import Loading from '../../../components/UI/Loading'
import ErrorMessage from '../../../components/UI/ErrorMessage'
import ConfirmMessage from '../../../components/UI//ConfirmMessage'
import { useUserDataReceiving } from '../../../hooks/useUserDataReceiving'
import SignupForm from '../../../components/auth/SignupForm'

export default function Signup() {
	const userAuthCtx = useContext(UserAuthenticationContext)
	const { pending, error, setError, sendRequest } = useHTTP()
	const { enteredData, handleEnteredData } = useUserDataReceiving({ name: '', email: '', password: '', keyword: '' })

	async function createUser(e) {
		e.preventDefault()

		if (!isEmail(enteredData.email)) {
			setError('Podany email nie odpowiada formatowi tekst@tekst.domena.')
			return
		} else if (
			isEmpty(enteredData.email) ||
			isEmpty(enteredData.name) ||
			isEmpty(enteredData.password) ||
			isEmpty(enteredData.keyword)
		) {
			setError('Wszystkie pola powinny być uzupewnione.')
			return
		} else if (!canBePassword(enteredData.password)) {
			setError(
				'Hasło powinno zawierać przynajmniej jedną dużą literę, znak specjalny, cyfrę oraz conajmniej 8 znaków. '
			)
			return
		} else {
			setError('')
		}

		const resData = await sendRequest('/signup', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user_name: enteredData.name,
				user_email: enteredData.email,
				user_password: enteredData.password,
				user_keyword: enteredData.keyword,
			}),
		})

		if (resData !== undefined) {
			userAuthCtx.handleConfirmMessage(`Użytkownik ${enteredData.name} został utworzony.`)
			redirect('/login')
		}
	}

	return (
		<>
			{pending && <Loading message={'Tworzę nowego użytkownika...'} />}
			{!pending && (
				<section>
					<div className='wrapper auth-form signup'>
						{error && <ErrorMessage message={error} />}
						{userAuthCtx.confirmMessage && <ConfirmMessage message={userAuthCtx.confirmMessage} />}
						<SignupForm onGetUserData={handleEnteredData} onSignup={createUser} userData={enteredData} />
					</div>
				</section>
			)}
		</>
	)
}
