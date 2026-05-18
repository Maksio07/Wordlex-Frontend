import styles from './ui.module.css'

export default function SubmitButton({ children, onClick, customStyle, ariaLabel, props }) {
	return (
		<button
			className={
				styles.ui__submit__btn +
				' text-[1.8rem] bg-(--submitBtnBg) rounded-[.8rem] text-(--white) font-medium cursor-pointer ' +
				customStyle
			}
			aria-label={ariaLabel}
			onClick={onClick}
			{...props}>
			{children}
		</button>
	)
}
