import Plus from '../icons/Action/Plus'
import styles from './ui.module.css'

export default function AddButton({ buttonText, customStyles, onClick, plusIsActive=false }) {
	return (
		<button
			type='button'
			aria-label={buttonText}
			name={buttonText}
			className={
				styles.add__btn +
				' flex justify-center items-center bg-(--navigationBackground) font-medium text-4xl rounded-[.8rem] text-(--white) cursor-pointer ' +
				customStyles
			}
			onClick={onClick}>
			{plusIsActive && <Plus width={'42'} height={'32'} fill={'var(--links)'} />}
			<span className={`${styles.add__btn__space}`}></span>
			{buttonText}
		</button>
	)
}
