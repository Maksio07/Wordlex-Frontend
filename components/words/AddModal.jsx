import { useContext } from 'react'
import AddModalForm from '../UI/AddModalForm'
import Input from '../UI/Input'
import { UserAuthenticationContext } from '../../store/UserAuthenticationContext'
import useHTTP from '../../hooks/useHTTP'
import useCsrf from '../../hooks/useCsrf'
import { isEmpty } from '../../util/validation'
import { useUserDataReceiving } from '../../hooks/useUserDataReceiving'
import ErrorMessage from '../UI/ErrorMessage'

export default function AddModal({ languageData, topicData, onCloseAddModal, onLoadWords }) {
	const { enteredData, handleEnteredData } = useUserDataReceiving({
		wordName: '',
		wordNameInPolish: '',
		example: '',
		imgUrl: '',
	})
	const { csrfToken } = useCsrf()
	const { pending, setError, sendRequest, error } = useHTTP()
	const isAuthCtx = useContext(UserAuthenticationContext)

	async function addWord(e) {
		e.preventDefault()

		if (isEmpty(enteredData.wordName) || isEmpty(enteredData.wordNameInPolish)) {
			setError('Pierwsze dwa pola powinny być uzupełnione.')
		}

		const wordId =
			topicData.topicIdInt +
			(Math.random() * 10000).toFixed(0) +
			'-' +
			enteredData.wordName.toLowerCase().split(' ').join('-')

		const resData = await sendRequest(
			`/profile/${topicData.topicData.user_id}/${languageData.languageId}/${topicData.topicData.topic_id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'CSRF-Token': csrfToken,
				},
				body: JSON.stringify({
					word_name: enteredData.wordName,
					word_polish_name: enteredData.wordNameInPolish,
					word_example: enteredData.example === '' ? null : enteredData.example,
					word_img_path: enteredData.imgUrl === '' ? null : enteredData.imgUrl,
					word_id: wordId,
					topic_id_int: topicData.topicIdInt,
					topic_id: topicData.topicData.topic_id,
					user_id: topicData.topicData.user_id,
					language_id_int: topicData.languageIdInt,
				}),
				credentials: 'include',
			}
		)

		if (resData !== undefined) {
			isAuthCtx.handleConfirmMessage('Słowo zostało dodane.')
			onCloseAddModal()
			onLoadWords()
		} else {
			setError('Coś poszło nie tak, spróbuj ponownie.')
		}
	}

	return (
		<AddModalForm
			title={'Stwórz Słowo'}
			buttonCaption={'Dodaj Słowo'}
			customStyles={' relative h-[56rem] w-[40rem]'}
			onClose={onCloseAddModal}
			onSubmit={addWord}
			saving={pending}>
			{error && <ErrorMessage message={error} />}
			<Input
				labelText={`Słowo po ${languageData.name.slice(0, -1).toLowerCase() + 'u'}`}
				htmlFor='wordName'
				name='wordName'
				id='wordName'
				type='text'
				placeholder='Wpisz słowo'
				minLength='1'
				value={enteredData.wordName}
				onChange={handleEnteredData}
			/>
			<Input
				labelText='Słowo po polsku'
				htmlFor='wordNameInPolish'
				name='wordNameInPolish'
				id='wordNameInPolish'
				type='text'
				placeholder='Wpisz słowo'
				minLength='1'
				value={enteredData.wordNameInPolish}
				onChange={handleEnteredData}
			/>
			<Input
				labelText='Przykład (opcjonalnie)'
				htmlFor='example'
				name='example'
				id='example'
				type='text'
				placeholder='Wpisz przykład'
				required={false}
				value={enteredData.example}
				onChange={handleEnteredData}
			/>
			<Input
				labelText='Link do obrazka (opcjonalnie)'
				htmlFor='imgUrl'
				name='imgUrl'
				id='imgUrl'
				type='text'
				placeholder='Podaj link do obrazka'
				required={false}
				value={enteredData.imgUrl}
				onChange={handleEnteredData}
			/>
		</AddModalForm>
	)
}
