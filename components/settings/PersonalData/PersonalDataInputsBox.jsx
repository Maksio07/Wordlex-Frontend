import PersonalDataInput from './PersonalDataInput'
import styles from './personal.module.css'

export default function PersonalDataInputsBox({ inputIsAvailable, onHandleInputState, enteredData, onChangeText }) {
	return (
		<div className={`${styles.inputs__container} flex justify-evenly items-center w-full`}>
			<div className={`${styles.inputs__box} flex flex-col items-end`}>
				<PersonalDataInput
					type={'text'}
					name={'name'}
					data={enteredData.name}
					value={enteredData.name}
					label={'Imię:'}
					key={'name'}
					placeholder='Wpisz imię'
					inputIsAvailable={inputIsAvailable.name}
					onHandleData={onHandleInputState}
					onChange={onChangeText}
				/>
				<PersonalDataInput
					type={'password'}
					name={'password'}
					data={'**********'}
					value={enteredData.password}
					label={'Hasło:'}
					key={'password'}
					placeholder='Wpisz hasło'
					inputIsAvailable={inputIsAvailable.password}
					onHandleData={onHandleInputState}
					onChange={onChangeText}
				/>
			</div>
			<div className={`${styles.inputs__box} flex flex-col items-end`}>
				<PersonalDataInput
					type={'email'}
					name={'email'}
					data={enteredData.email}
					value={enteredData.email}
					label={'Email:'}
					key={'email'}
					placeholder='Wpisz email'
					inputIsAvailable={inputIsAvailable.email}
					onHandleData={onHandleInputState}
					onChange={onChangeText}
				/>
				<PersonalDataInput
					type={'password'}
					name={'keyword'}
					data={'**********'}
					value={enteredData.keyword}
					label={'Kluczowe Słowo:'}
					key={'keyword'}
					placeholder='Wpisz kluczowe słowo'
					inputIsAvailable={inputIsAvailable.keyword}
					onHandleData={onHandleInputState}
					onChange={onChangeText}
				/>
			</div>
		</div>
	)
}
