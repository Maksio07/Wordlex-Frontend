'use client'

import { useContext } from 'react'
import useHTTP from '../../../hooks/useHTTP'
import { isEmail, isEmpty } from '../../../util/validation'
import useCsrf from '../../../hooks/useCsrf'
import { UserAuthenticationContext } from '../../../store/UserAuthenticationContext'
import Loading from '../../../components/UI/Loading'
import ErrorMessage from '../../../components/UI/ErrorMessage'
import ConfirmMessage from '../../../components/UI/ConfirmMessage'
import { updateURL } from './action'
import { useUserDataReceiving } from '../../../hooks/useUserDataReceiving'
import ForgotPasswordForm from '../../../components/auth/ForgotPasswordForm'

export default function ForgotPassword() {
	const userAuthCtx = useContext(UserAuthenticationContext)
	const { enteredData, handleEnteredData } = useUserDataReceiving({ email: '', keyword: '' })
	const { pending, error, setError, sendRequest } = useHTTP()
	const { csrfToken } = useCsrf()

	async function sendFordotPasswordRequest(e) {
		e.preventDefault()

		if (!isEmail(enteredData.email)) {
			setError('Podany email nie odpowiada formatowi tekst@tekst.domena.')
			return
		} else if (isEmpty(enteredData.email || enteredData.keyword)) {
			setError('Wszystkie pola powinny być uzupełnione.')
			return
		} else {
			setError('')
		}

		const resData = await sendRequest('/forgot-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			body: JSON.stringify({
				user_email: enteredData.email,
				user_keyword: enteredData.keyword,
			}),
			credentials: 'include',
		})

		if (resData !== undefined) {
			userAuthCtx.handleConfirmMessage('Zostałeś/-aś przekierowany/a na stronę do zmiany hasła, możesz zmienić hasło.')
			userAuthCtx.handleToken(resData.resetToken)
		}

		updateURL(resData.resetLink)
	}

	return (
		<>
			{pending && <Loading message={'Przekierowuję na stronę do zmiany hasła...'} />}
			{!pending && (
				<section>
					<div className='wrapper auth-form '>
						{error && <ErrorMessage message={error} />}
						{userAuthCtx.confirmMessage && <ConfirmMessage message={userAuthCtx.confirmMessage} />}
						<ForgotPasswordForm
							onGetUserData={handleEnteredData}
							userData={enteredData}
							onSendRequest={sendFordotPasswordRequest}
						/>
					</div>
				</section>
			)}
		</>
	)
}
