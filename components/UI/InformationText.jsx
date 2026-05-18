import styles from './ui.module.css'

export default function InformationText({ message }) {
	return <p className={`${styles.information} text-center text-(--title) text-2xl`}>{message}</p>
}
