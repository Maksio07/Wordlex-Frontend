import Link from 'next/link'
import styles from './contact-map.module.css'

export default function ContactMapLinkItem({ href, customStyles, name, icon, arialabel }) {
	return (
		<Link
			href={href}
			target='_blank'
			rel='noopener'
			className={styles.link__item + ' flex items-center justify-center w-56 rounded-lg ' + customStyles}
			aria-label={name || arialabel}>
			{icon}
			<p className={`${styles.link__item_text} text-[1.6rem] text-(--white)`}>{name}</p>
		</Link>
	)
}
