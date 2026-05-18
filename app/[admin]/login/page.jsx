'use client'

import { useContext } from 'react'
import { updateUserID } from './actions'
import Link from 'next/link'
import useHTTP from '../../../hooks/useHTTP'
import useCsrf from '../../../hooks/useCsrf'
import { isEmail, isEmpty } from '../../../util/validation'
import { UserAuthenticationContext } from '../../../store/UserAuthenticationContext'
import Loading from '../../../components/UI/Loading'
import ErrorMessage from '../../../components/UI/ErrorMessage'
import ConfirmMessage from '../../../components/UI/ConfirmMessage'
import { useUserDataReceiving } from '../../../hooks/useUserDataReceiving'
import ModalForm from '../../../components/UI/ModalForm'
import Input from '../../../components/UI/Input'

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
						<ModalForm
							title={'Zaloguj się na konto administratora'}
							buttonCaption={'Login'}
							customStyles={'h-[48rem] w-[40rem] max-[360px]:h-[54rem]'}
							ariaLabel={'Login'}
							onSubmit={loginUser}>
							<Input
								placeholder={'Podaj email'}
								labelText={'Email:'}
								name='email'
								type='text'
								htmlFor='email'
								id='email'
								minLength='4'
								value={enteredData.email}
								onChange={handleEnteredData}
							/>
							<Input
								placeholder={'Podaj hasło'}
								labelText={'Hasło:'}
								htmlFor='password'
								name='password'
								id='password'
								type='password'
								minLength='8'
								value={enteredData.password}
								onChange={handleEnteredData}
							/>
							<button
								className={'p-[.4rem] text-2xl hover:text-(--white) transition-colors duration-300 cursor-pointer'}>
								<Link href='/forgot-password'>Zapomniałeś hasła?</Link>
							</button>
						</ModalForm>
					</div>
				</section>
			)}
		</>
	)
}
