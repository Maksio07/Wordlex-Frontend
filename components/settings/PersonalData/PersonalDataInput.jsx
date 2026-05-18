import styles from './personal.module.css'

export default function PersonalDataInput(
	{ type, name, label, data, value, onChange, onHandleData, inputIsAvailable, placeholder },
	props
) {
	let valueProp = name === 'password' || name === 'keyword' ? '' : value

	return (
		<div className={`${styles.data__box} flex items-center`} key={name} id={name}>
			<label htmlFor={name} className={`${styles.label} text-3xl text-(--title) font-medium`}>
				{label}
			</label>

			{inputIsAvailable ? (
				<input
					type={type}
					name={name}
					className={`${styles.input}`}
					defaultValue={valueProp}
					onChange={e => onChange(e, name)}
					placeholder={placeholder}
					{...props}
				/>
			) : (
				<p className={`${styles.text} text-3xl text-(--title) text-wrap`}>{data}</p>
			)}

			<button type='button' aria-label='Edytuj' className={`${styles.edit__btn}`} onClick={onHandleData}>
				{inputIsAvailable ? 'Zapisz' : 'Edytuj'}
			</button>
		</div>
	)
}
