import { useContext } from 'react'
import AddModalForm from '../UI/AddModalForm'
import Input from '../UI/Input'
import { UserAuthenticationContext } from '../../store/UserAuthenticationContext'
import useHTTP from '../../hooks/useHTTP'
import useCsrf from '../../hooks/useCsrf'
import { isEmpty } from '../../util/validation'
import { useUserDataReceiving } from '../../hooks/useUserDataReceiving'
import ErrorMessage from '../UI/ErrorMessage'

export default function EditModal({ onCloseEditModal, languageData, onLoadTopics, topicToEdit }) {
	const { enteredData, handleEnteredData } = useUserDataReceiving({
		newTopicName: topicToEdit.topic_name,
		newTopicNameInPolish: topicToEdit.topic_polish_name,
	})
	const { csrfToken } = useCsrf()
	const { pending, setError, sendRequest, error } = useHTTP()
	const isAuthCtx = useContext(UserAuthenticationContext)

	async function editTopic(e) {
		e.preventDefault()

		if (isEmpty(enteredData.newTopicName) || isEmpty(enteredData.newTopicNameInPolish)) {
			setError('Wszystkie pola powinny być uzupełnione.')
		}

		const newTopicId = languageData.language_id + '-' + enteredData.newTopicName.toLowerCase().replace(/\s+/g, '-')

		const resData = await sendRequest(`/profile/${topicToEdit.user_id}/${languageData.language_id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			body: JSON.stringify({
				new_topic_name: enteredData.newTopicName,
				new_topic_polish_name: enteredData.newTopicNameInPolish,
				new_topic_id: newTopicId,
				topic_id: topicToEdit.topic_id,
				user_id: topicToEdit.user_id,
				language_id_int: topicToEdit.language_id,
			}),
			credentials: 'include',
		})

		if (resData !== undefined) {
			isAuthCtx.handleConfirmMessage('Temat został zedytowany.')
			onCloseEditModal()
			onLoadTopics()
		} else {
			setError('Coś poszło nie tak, spróbuj ponownie.')
		}
	}

	return (
		<AddModalForm
			title={'Edytuj temat'}
			buttonCaption={'Zapisz Zmiany'}
			customStyles={' relative h-[42rem] w-[40rem]'}
			onClose={onCloseEditModal}
			onSubmit={editTopic}
			saving={pending}>
			{error && <ErrorMessage message={error} />}
			<Input
				labelText={`Nazwa tematu po ${languageData.name.slice(0, -1).toLowerCase() + 'u'}`}
				htmlFor='newTopicName'
				name='newTopicName'
				id='newTopicName'
				type='text'
				placeholder='Wpisz nową nazwę tematu'
				minLength='2'
				value={enteredData.newTopicName}
				onChange={handleEnteredData}
			/>
			<Input
				labelText='Nazwa tematu po polsku'
				htmlFor='newTopicNameInPolish'
				name='newTopicNameInPolish'
				id='newTopicNameInPolish'
				type='text'
				placeholder='Wpisz nową nazwę tematu'
				minLength='2'
				value={enteredData.newTopicNameInPolish}
				onChange={handleEnteredData}
			/>
		</AddModalForm>
	)
}
