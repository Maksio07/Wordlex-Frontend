import styles from './ui.module.css'

export default function ErrorMessage({ message, customStyles }) {
	return (
		<p
			className={
				styles.error__message +
				' w-160 max-[450px]:w-120 max-[360px]:w-104 text-[1.6rem] text-[#ce1a1af5] text-center ' +
				customStyles
			}>
			{message}
		</p>
	)
}
