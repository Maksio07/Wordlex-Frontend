import styles from './ui.module.css'

export default function Input({ children, labelText, inputStyle, labelStyle, ...props }) {
	return (
		<>
			<label className={styles.ui__label + ' text-[2rem] text-(--links) text-center ' + labelStyle}>{labelText}</label>
			<input
				required
				className={styles.ui__input + ' w-[75%] text-[1.6rem] bg-(--links) rounded-[.6rem] ' + inputStyle}
				{...props}
			/>
		</>
	)
}
