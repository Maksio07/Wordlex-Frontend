import Link from 'next/link'
import BackArrow from '../icons/Action/BackArrow'
import styles from './ui.module.css'

export default function BackBtn({ href = '', text, customStyles }) {
	return (
		<Link href={href} className={`${styles.back_btn} flex items-center ${customStyles}`} aria-label={text}>
			<BackArrow width={22} height={22} fill={'var(--links)'} />
			<span className={`${styles.space}`}></span>
			{text}
		</Link>
	)
}
