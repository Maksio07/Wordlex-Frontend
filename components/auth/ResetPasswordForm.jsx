import ModalForm from '../UI/ModalForm'
import Input from '../UI/Input'

export default function ResetPasswordForm({ onGetUserData, userData, onUpdatePassword }) {
	return (
		<ModalForm
			title={'Reset Hasła'}
			buttonCaption={'Zmień Hasło'}
			customStyles={'h-[30rem] w-[40rem] max-[360px]:h-[32rem]'}
			ariaLabel={'Update password'}
			onSubmit={onUpdatePassword}>
			<Input
				placeholder={'Wpisz nowe hasło'}
				labelText={'Nowe Hasło:'}
				htmlFor='newPassword'
				name='newPassword'
				id='newPassword'
				type='password'
				minLength='4'
				value={userData.keyword}
				onChange={onGetUserData}
			/>
		</ModalForm>
	)
}
