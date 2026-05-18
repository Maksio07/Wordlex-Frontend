import styles from './ui.module.css'

export default function Loading({ message }) {
	return (
		<div className={styles.loading__container}>
			<div className={styles.spinner}></div>
			<p className={styles.loading__text}>{message}</p>
		</div>
	)
}
