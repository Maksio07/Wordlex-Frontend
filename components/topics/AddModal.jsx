import { useContext } from 'react'
import AddModalForm from '../UI/AddModalForm'
import Input from '../UI/Input'
import { UserAuthenticationContext } from '../../store/UserAuthenticationContext'
import useHTTP from '../../hooks/useHTTP'
import useUser from '../../hooks/useUser'
import useCsrf from '../../hooks/useCsrf'
import { isEmpty } from '../../util/validation'
import { useUserDataReceiving } from '../../hooks/useUserDataReceiving'
import ErrorMessage from '../UI/ErrorMessage'

export default function AddModal({ onCloseModal, languageData, languageIdInt, onLoadTopics }) {
	const { enteredData, handleEnteredData } = useUserDataReceiving({ topicName: '', topicNameInPolish: '' })
	const { csrfToken } = useCsrf()
	const { user } = useUser()
	const { pending, setError, sendRequest, error } = useHTTP()
	const isAuthCtx = useContext(UserAuthenticationContext)

	async function addTopic(e) {
		e.preventDefault()

		if (isEmpty(enteredData.topicName) || isEmpty(enteredData.topicNameInPolish)) {
			setError('Wszystkie pola powinny być uzupełnione.')
		}

		const topicId = languageData.language_id + '-' + enteredData.topicName.toLowerCase().replace(/\s+/g, '-')

		const resData = await sendRequest(`/profile/${user.id}/${languageData.language_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			body: JSON.stringify({
				topic_name: enteredData.topicName,
				topic_polish_name: enteredData.topicNameInPolish,
				topic_id: topicId,
				user_id: user.id,
				language_id_int: languageIdInt,
			}),
			credentials: 'include',
		})

		if (resData !== undefined) {
			isAuthCtx.handleConfirmMessage('Temat został dodany.')
			onCloseModal()
			onLoadTopics()
		} else {
			setError('Coś poszło nie tak, spróbuj ponownie.')
		}
	}

	return (
		<AddModalForm
			title={'Stwórz temat'}
			buttonCaption={'Dodaj Temat'}
			customStyles={' relative h-[42rem] w-[40rem]'}
			onClose={onCloseModal}
			onSubmit={addTopic}
			saving={pending}>
			{error && <ErrorMessage message={error} />}
			<Input
				labelText={`Nazwa tematu po ${languageData.name.slice(0, -1).toLowerCase() + 'u'}`}
				htmlFor='topicName'
				name='topicName'
				id='topicName'
				type='text'
				placeholder='Wpisz nazwę tematu'
				minLength='2'
				value={enteredData.topicName}
				onChange={handleEnteredData}
			/>
			<Input
				labelText='Nazwa tematu po polsku'
				htmlFor='topicNameInPolish'
				name='topicNameInPolish'
				id='topicNameInPolish'
				type='text'
				placeholder='Wpisz nazwę tematu'
				minLength='2'
				value={enteredData.topicNameInPolish}
				onChange={handleEnteredData}
			/>
		</AddModalForm>
	)
}
