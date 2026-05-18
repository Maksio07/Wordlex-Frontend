import { useContext } from 'react'
import AddModalForm from '../UI/AddModalForm'
import Input from '../UI/Input'
import { UserAuthenticationContext } from '../../store/UserAuthenticationContext'
import useHTTP from '../../hooks/useHTTP'
import useCsrf from '../../hooks/useCsrf'
import { isEmpty } from '../../util/validation'
import { useUserDataReceiving } from '../../hooks/useUserDataReceiving'
import ErrorMessage from '../UI/ErrorMessage'

export default function EditModal({ wordToEdit, onLoadWords, onCloseEditModal, topicData, languageData }) {
	const { enteredData, handleEnteredData } = useUserDataReceiving({
		newWordName: wordToEdit.word_name,
		newWordNameInPolish: wordToEdit.word_polish_name,
		newWordExample: wordToEdit.word_example,
		newWordImgUrl: wordToEdit.word_img_path,
	})
	const { csrfToken } = useCsrf()
	const { pending, setError, sendRequest, error } = useHTTP()
	const isAuthCtx = useContext(UserAuthenticationContext)

	async function editWord(e) {
		e.preventDefault()

		if (isEmpty(enteredData.newWordName) || isEmpty(enteredData.newWordNameInPolish)) {
			setError('Pierwsze dwa pola powinny być uzupełnione.')
		}

		const wordId =
			topicData.topicIdInt + (Math.random() * 10000).toFixed(0) + '-' + enteredData.newWordName.toLowerCase()

		const resData = await sendRequest(
			`/profile/${topicData.topicData.user_id}/${languageData.languageId}/${topicData.topicData.topic_id}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'CSRF-Token': csrfToken,
				},
				body: JSON.stringify({
					new_word_name: enteredData.newWordName,
					new_word_polish_name: enteredData.newWordNameInPolish,
					new_word_example: enteredData.newWordExample,
					new_word_img_path: enteredData.newWordImgUrl,
					new_word_id: wordId,
					topic_id_int: topicData.topicIdInt,
					user_id: topicData.topicData.user_id,
					language_id_int: topicData.languageIdInt,
					word_id: wordToEdit.word_id,
				}),
				credentials: 'include',
			}
		)

		if (resData !== undefined) {
			isAuthCtx.handleConfirmMessage(`Słowo ${wordToEdit.word_name} zostało zaktualizowane.`)
			onCloseEditModal()
			onLoadWords()
		} else {
			setError('Coś poszło nie tak, spróbuj ponownie.')
		}
	}

	return (
		<AddModalForm
			title={'Edytuj Słowo'}
			buttonCaption={'Zapisz Zmiany'}
			customStyles={' relative h-[56rem] w-[40rem]'}
			onClose={onCloseEditModal}
			onSubmit={editWord}
			saving={pending}>
			{error && <ErrorMessage message={error} />}
			<Input
				labelText={`Słowo po ${languageData.name.slice(0, -1).toLowerCase() + 'u'}`}
				htmlFor='newWordName'
				name='newWordName'
				id='newWordName'
				type='text'
				placeholder='Wpisz słowo'
				minLength='1'
				value={enteredData.newWordName}
				onChange={handleEnteredData}
			/>
			<Input
				labelText='Słowo po polsku'
				htmlFor='newWordNameInPolish'
				name='newWordNameInPolish'
				id='newWordNameInPolish'
				type='text'
				placeholder='Wpisz słowo'
				minLength='1'
				value={enteredData.newWordNameInPolish}
				onChange={handleEnteredData}
			/>
			<Input
				labelText='Przykład (opcjonalnie)'
				htmlFor='newWordExample'
				name='newWordExample'
				id='newWordExample'
				type='text'
				placeholder='Wpisz przykład'
				required={false}
				value={enteredData.newWordExample === null ? '' : enteredData.newWordExample}
				onChange={handleEnteredData}
			/>
			<Input
				labelText='Link do obrazka (opcjonalnie)'
				htmlFor='newWordImgUrl'
				name='newWordImgUrl'
				id='newWordImgUrl'
				type='text'
				placeholder='Podaj link do obrazka'
				required={false}
				value={enteredData.newWordImgUrl === null ? '' : enteredData.newWordImgUrl}
				onChange={handleEnteredData}
			/>
		</AddModalForm>
	)
}
