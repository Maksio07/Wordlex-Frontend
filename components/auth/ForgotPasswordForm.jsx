import ModalForm from '../UI/ModalForm'
import Input from '../UI/Input'

export default function ForgotPasswordForm({ onGetUserData, userData, onSendRequest }) {
    return (
        <ModalForm
            title={'Reset Hasła'}
            buttonCaption={'Zweryfikuj Dane'}
            customStyles={'h-[36rem] w-[40rem] max-[360px]:h-[42rem]'}
            ariaLabel={'Reset password'}
            onSubmit={onSendRequest}>
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
