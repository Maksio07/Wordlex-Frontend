import Image from 'next/image'
import { useState, useContext } from 'react'
import { UserAuthenticationContext } from '../../store/UserAuthenticationContext'
import phoneBig from '../../public/contact/phone-big.jpg'
import phoneSmall from '../../public/contact/phone-small.jpg'
import useWindowSize from '../../hooks/useWindowSize'
import ModalForm from '../UI/ModalForm'
import Input from '../UI/Input'
import { useUserDataReceiving } from '../../hooks/useUserDataReceiving'
import { isEmail, isEmpty } from '../../util/validation'
import ErrorMessage from '../UI/ErrorMessage'
import ConfirmMessage from '../UI/ConfirmMessage'
import styles from './contact-form.module.css'

export default function ContactForm() {
	const { width } = useWindowSize()
	const { enteredData, handleEnteredData } = useUserDataReceiving({
		name: '',
		email: '',
		subject: '',
		message: '',
	})
	const [error, setError] = useState('')
	const isAuthCtx = useContext(UserAuthenticationContext)

	const sendMessage = e => {
		e.preventDefault()

		if (!isEmail(enteredData.email)) {
			setError('Podany email nie odpowiada formatowi tekst@tekst.domena.')
			return new Error('Podany email nie odpowiada formatowi tekst@tekst.domena.')
		} else if (
			isEmpty(enteredData.email) ||
			isEmpty(enteredData.name) ||
			isEmpty(enteredData.subject) ||
			isEmpty(enteredData.message)
		) {
			setError('Wszystkie pola powinny być uzupełnione.')
			return new Error('Wszystkie pola powinny być uzupełnione.')
		} else {
			setError('')
		}

		if (!error) {
			isAuthCtx.handleConfirmMessage('Wiadomość została wysłana.')
			setError('')
		}
	}

	return (
		<div className={styles.contact__form + ' flex justify-between h-240 bg-(--aboutUsCardBg) rounded-2xl'}>
			<Image
				src={width > 650 ? phoneBig : phoneSmall}
				alt='An old phone keyboard.'
				loading='eager'
				className={styles.img + ' w-[50%] h-full'}
			/>
			<ModalForm
				customStyles={styles.form + ' bg-transparent w-[50%] h-full'}
				buttonCaption={'Wyślij wiadomość'}
				onSubmit={sendMessage}>
				{error && <ErrorMessage message={error} />}
				{isAuthCtx.confirmMessage && <ConfirmMessage message={isAuthCtx.confirmMessage} />}
				<Input
					labelText={'Imię'}
					placeholder={'Podaj imię'}
					labelStyle={' text-(--title)'}
					inputStyle={styles.input}
					name='name'
					type='text'
					htmlFor='name'
					id='name'
					onChange={handleEnteredData}
				/>
				<Input
					labelText={'Email'}
					placeholder={'Podaj email'}
					labelStyle={' text-(--title)'}
					inputStyle={styles.input}
					name='email'
					type='email'
					htmlFor='email'
					id='email'
					onChange={handleEnteredData}
				/>
				<Input
					labelText={'Temat'}
					placeholder={'Podaj temat'}
					labelStyle={' text-(--title)'}
					inputStyle={styles.input}
					name='subject'
					type='text'
					htmlFor='subject'
					id='subject'
					onChange={handleEnteredData}
				/>
				<div className='flex flex-col items-center w-full'>
					<label htmlFor='message' className={styles.textarea__label + ' text-center text-(--title) text-[2rem]'}>
						Wiadomość
					</label>
					<textarea
						name='message'
						id='message'
						type='text'
						placeholder='Twoja wiadomość'
						className={styles.textarea + ' min-h-24 h-32 max-h-72 w-[75%] text-[1.6rem] bg-(--white) rounded-[.6rem]'}
						onChange={handleEnteredData}></textarea>
				</div>
			</ModalForm>
		</div>
	)
}
