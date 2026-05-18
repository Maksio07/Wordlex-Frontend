import Star from '../icons/Opinions/Star'
import styles from './about-us-opinions.module.css'

export default function Note() {
	return (
		<div className={styles.note__box + ' flex items-center'}>
			<p className={styles.note__text + ' text-[1.6rem] text-(--title)'}>10/10</p>
			<Star customStyles={styles.star__icon} width={'2rem'} height={'2rem'} fill={'gold'} />
			<Star customStyles={styles.star__icon} width={'2rem'} height={'2rem'} fill={'gold'} />
			<Star customStyles={styles.star__icon} width={'2rem'} height={'2rem'} fill={'gold'} />
			<Star customStyles={styles.star__icon} width={'2rem'} height={'2rem'} fill={'gold'} />
			<Star customStyles={styles.star__icon} width={'2rem'} height={'2rem'} fill={'gold'} />
			<Star customStyles={styles.star__icon} width={'2rem'} height={'2rem'} fill={'gold'} />
			<Star customStyles={styles.star__icon} width={'2rem'} height={'2rem'} fill={'gold'} />
			<Star customStyles={styles.star__icon} width={'2rem'} height={'2rem'} fill={'gold'} />
			<Star customStyles={styles.star__icon} width={'2rem'} height={'2rem'} fill={'gold'} />
			<Star customStyles={styles.star__icon} width={'2rem'} height={'2rem'} fill={'gold'} />
		</div>
	)
}
