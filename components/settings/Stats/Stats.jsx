import SettingsBox from '../SettingsBox'
import WordsAmount from './WordsAmount'
import ErrorMessage from '../../UI/ErrorMessage'
import styles from './stats.module.css'

export default function Stats({ user, error }) {
	return (
		<SettingsBox customStyles={`${styles.stats}`}>
			<h2 className={`${styles.title} text-center text-4xl font-semibold text-(--title)`}>Statystyki</h2>
			<span className={`${styles.line}`}></span>
			{error && <ErrorMessage message={error} />}
			<WordsAmount user={user} />
		</SettingsBox>
	)
}
