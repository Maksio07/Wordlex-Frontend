import ModalForm from '../UI/ModalForm'
import Input from '../UI/Input'

export default function SignupForm({ onGetUserData, userData, onSignup }) {
	return (
		<ModalForm
			title={'Zarejestruj się'}
			buttonCaption={'Signup'}
			customStyles={'h-[56rem] w-[40rem] max-[360px]:h-[60rem]'}
			ariaLabel={'Signup'}
			onSubmit={onSignup}>
			<Input
				placeholder={'Podaj imię'}
				labelText={'Imię:'}
				name='name'
				type='text'
				htmlFor='name'
				id='name'
				minLength='2'
				value={userData.name}
				onChange={onGetUserData}
			/>
			<Input
				placeholder={'Podaj email'}
				labelText={'Email:'}
				htmlFor='email'
				name='email'
				id='email'
				type='email'
				minLength='4'
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
			<Input
				placeholder={'np. panieńskie nazwisko matki'}
				labelText={'Kluczowe słowo:'}
				htmlFor='keyword'
				name='keyword'
				id='keyword'
				type='text'
				minLength='4'
				value={userData.keyword}
				onChange={onGetUserData}
			/>
		</ModalForm>
	)
}
