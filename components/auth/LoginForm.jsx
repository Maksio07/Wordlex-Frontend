import Link from 'next/link'
import ModalForm from '../UI/ModalForm'
import Input from '../UI/Input'
import styles from './auth.module.css'

export default function LoginForm({ onGetUserData, userData, onLogin }) {
	return (
		<ModalForm
			title={'Zaloguj się'}
			buttonCaption={'Login'}
			customStyles={'h-[48rem] w-[40rem] max-[360px]:h-[54rem]'}
			ariaLabel={'Login'}
			onSubmit={onLogin}>
			<Input
				placeholder={'Podaj email'}
				labelText={'Email:'}
				name='email'
				type='text'
				htmlFor='email'
				id='email'
				minLength='2'
				value={userData.email}
				onChange={onGetUserData}
			/>
			<Input
				placeholder={'Podaj hasło'}
				labelText={'Hasło:'}
				htmlFor='password'
				name='password'
				id='password'
				type='password'
				minLength='8'
				value={userData.password}
				onChange={onGetUserData}
			/>
			<div
				className={
					styles.login__links + ' flex justify-evenly w-full text-[1.5rem] text-(--title) max-[360px]:flex-col'
				}>
				<button className={styles.forgot__password__link + ' p-[.4rem] cursor-pointer'}>
					<Link href='/forgot-password'>Zapomniałeś hasła?</Link>
				</button>
				<button className={styles.signup__link + ' p-[.4rem] cursor-pointer'}>
					<Link href='/signup'>Zarejestruj się</Link>
				</button>
			</div>
		</ModalForm>
	)
}
