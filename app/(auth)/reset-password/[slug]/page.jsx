'use client'

import { useContext } from 'react'
import { redirect } from 'next/navigation'
import useHTTP from '../../../../hooks/useHTTP'
import { isEmpty, canBePassword } from '../../../../util/validation'
import { UserAuthenticationContext } from '../../../../store/UserAuthenticationContext'
import Loading from '../../../../components/UI/Loading'
import useCsrf from '../../../../hooks/useCsrf'
import ErrorMessage from '../../../../components/UI/ErrorMessage'
import ConfirmMessage from '../../../../components/UI/ConfirmMessage'
import { useUserDataReceiving } from '../../../../hooks/useUserDataReceiving'
import ResetPasswordForm from '../../../../components/auth/ResetPasswordForm'

export default function ResetPassword() {
	const userAuthCtx = useContext(UserAuthenticationContext)
	const { enteredData, handleEnteredData } = useUserDataReceiving({ newPassword: '' })
	const { pending, error, setError, sendRequest } = useHTTP()
	const { csrfToken } = useCsrf()

	async function resetPassword(e) {
		e.preventDefault()

		if (!canBePassword(enteredData.newPassword)) {
			setError('Hasło powinno zawierać przynajmniej jedną dużą literę, znak specjalny, cyfrę oraz conajmniej 8 znaków.')
			return
		} else if (isEmpty(enteredData.newPassword)) {
			setError('Wszystkie pola powinny być uzupełnione.')
			return
		} else {
			setError('')
		}

		const resData = await sendRequest('/reset-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			body: JSON.stringify({
				userNewPasword: enteredData.newPassword,
				token: userAuthCtx.token,
			}),
			credentials: 'include',
		})

		if (resData !== undefined) {
			userAuthCtx.handleConfirmMessage('Hasło zostało zmienione pomyślnie.')
			userAuthCtx.handleToken('')
		}

		const timer = setTimeout(() => {
			redirect('/login')
		}, 1500)

		return () => clearTimeout(timer)
	}

	return (
		<>
			{pending && <Loading message={'Przekierowuję na stronę do zmiany hasła...'} />}
			{!pending && (
				<section>
					<div className='wrapper auth-form '>
						{error && <ErrorMessage message={error} />}
						{userAuthCtx.confirmMessage && <ConfirmMessage message={userAuthCtx.confirmMessage} />}
						<ResetPasswordForm
							onGetUserData={handleEnteredData}
							userData={enteredData}
							onUpdatePassword={resetPassword}
						/>
					</div>
				</section>
			)}
		</>
	)
}
