import { useState, useContext } from 'react'
import { createPortal } from 'react-dom'
import SettingsBox from '../SettingsBox'
import PersonalDataInputsBox from './PersonalDataInputsBox'
import SubmitButton from '../../UI/SumbitButton'
import { UserAuthenticationContext } from '../../../store/UserAuthenticationContext'
import { ModeContext } from '../../../store/modeContext'
import ErrorMessage from '../../UI/ErrorMessage'
import useHTTP from '../../../hooks/useHTTP'
import useCsrf from '../../../hooks/useCsrf'
import { useUserDataReceiving } from '../../../hooks/useUserDataReceiving'
import { canBePassword, isEmail, isEmpty } from '../../../util/validation'
import DeleteModal from '../../UI/DeleteModal'
import styles from './personal.module.css'

export default function PersonalData({ user, userId }) {
	const [inputIsAvailable, setInputIsAvailable] = useState({
		name: false,
		email: false,
		password: false,
		keyword: false,
	})

	const { enteredData, handleEnteredData } = useUserDataReceiving({
		name: user.user_name,
		email: user.user_email,
		password: user.user_password,
		keyword: user.user_keyword,
	})
	const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

	const isAuthCtx = useContext(UserAuthenticationContext)
	const modeCtx = useContext(ModeContext)
	const { csrfToken } = useCsrf()
	const { error, sendRequest, setError, pending } = useHTTP()

	async function updateUserData(e) {
		e.preventDefault()

		if (inputIsAvailable.name || inputIsAvailable.email || inputIsAvailable.password || inputIsAvailable.keyword) {
			setError('Zamknij najpierw wszystkie okna edycji.')
			return
		} else if (!isEmail(enteredData.email)) {
			setError('Podany email nie odpowiada formatowi tekst@tekst.domena.')
			return
		} else if (
			isEmpty(enteredData.email) ||
			isEmpty(enteredData.name) ||
			isEmpty(enteredData.password) ||
			isEmpty(enteredData.keyword)
		) {
			setError('Wszystkie pola powinny być uzupewnione.')
			return
		} else if (!canBePassword(enteredData.password) && enteredData.password.length !== 60) {
			setError(
				'Hasło powinno zawierać przynajmniej jedną dużą literę, znak specjalny, cyfrę oraz conajmniej 8 znaków. '
			)
			return
		} else {
			setError('')
		}

		const resData = await sendRequest(`/profile/${userId}/settings`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			body: JSON.stringify({
				user_id: userId,
				new_user_name: enteredData.name,
				new_user_email: enteredData.email,
				new_user_password: enteredData.password,
				new_user_keyword: enteredData.keyword,
			}),
			credentials: 'include',
		})

		if (resData) {
			isAuthCtx.handleConfirmMessage(`${enteredData.name}, Twoje dane zostały zaktualizowane.`)
		} else {
			setError('Coś poszło nie tak, spróbuj ponownie.')
		}
	}

	function handleDeleteModalState() {
		setDeleteModalIsOpen(prevState => !prevState)
		modeCtx.handleShadowIsActive(prevState => !prevState)
	}

	async function deleteUser() {
		const resData = await sendRequest(`/profile/${userId}/settings`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'CSRF-Token': csrfToken,
			},
			body: JSON.stringify({
				user_id: userId,
			}),
			credentials: 'include',
		})

		if (!resData) {
			setError('Coś poszło nie tak, spróbuj ponownie.')
		}

		handleDeleteModalState()

		isAuthCtx.handleConfirmMessage(
			`${enteredData.name}, Twoje konto zostało usunięte, bardzo nam przykro, że rezygnujesz z naszych usług...`
		)

		const timer = setTimeout(() => {
			window.location.href = '/login'
		}, 3000)

		return () => clearTimeout(timer)
	}

	function handleInputState(e) {
		const inputName = e.target.parentElement.id

		setInputIsAvailable(prevState => {
			return {
				...prevState,
				[inputName]: (prevState.inputName = !prevState.inputName),
			}
		})
	}

	return (
		<SettingsBox>
			<h2 className={`${styles.title} text-center text-4xl font-semibold text-(--title)`}>Dane Personalne</h2>
			<span className={`${styles.line}`}></span>
			{error && <ErrorMessage message={error} />}
			{pending ? (
				<p className={`${styles.ul_loading}`}>Aktualizuję dane...</p>
			) : (
				<PersonalDataInputsBox
					inputIsAvailable={inputIsAvailable}
					onHandleInputState={handleInputState}
					enteredData={enteredData}
					onChangeText={handleEnteredData}
				/>
			)}

			<h2 className={`${styles.title} text-center text-4xl font-semibold text-(--title)`}>Niebezpieczna Strefa</h2>
			<span className={`${styles.line}`}></span>
			<div className={`${styles.danger__zone} flex rounded-[.8rem] w-full justify-evenly`}>
				<div className='flex flex-col'>
					<h3 className={`${styles.danger__subtitle} font-medium text-3xl text-(--title)`}>Usuń konto</h3>
					<p className='font-light text-2xl text-(--title) max-[975px]:text-center'>
						To będzie się wiązało z utratą wszytskich zapisanych danych bez możliwości odzysku.
					</p>
				</div>
				<button type='button' aria-label='Usuń' onClick={handleDeleteModalState} className={`${styles.delete__btn}`}>
					Usuń Konto
				</button>
			</div>
			<SubmitButton ariaLabel={'Zapisz zmiany'} onClick={updateUserData}>
				Zapisz zmiany
			</SubmitButton>
			{deleteModalIsOpen &&
				createPortal(
					<DeleteModal
						onDelete={deleteUser}
						onClose={handleDeleteModalState}
						title={'Czy na pewno chcesz usunąć konto?'}
					/>,
					document.body
				)}
		</SettingsBox>
	)
}
