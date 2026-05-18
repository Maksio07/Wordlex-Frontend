import styles from './ui.module.css'

export default function ConfirmMessage({ message, customStyles }) {
	return (
		<p
			className={
				styles.confirm__message +
				' w-160 max-[450px]:w-120 max-[360px]:w-104 text-[1.6rem] text-[#1ace23e3] text-center ' +
				customStyles
			}>
			{message}
		</p>
	)
}
