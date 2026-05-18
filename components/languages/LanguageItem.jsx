import Link from 'next/link'
import Delete from '../icons/Action/Delete'
import styles from './languagesList.module.css'

export default function LanguageItem({ languages, user, onDeleteLanguage }) {
	return (
		<>
			{languages &&
				languages.map(item => {
					return (
						<li
							key={item.id}
							id={item.language_id}
							className={
								styles.language__box +
								' relative flex justify-center items-center h-120 w-88 font-medium text-4xl rounded-[.8rem] text-(--white) cursor-pointer'
							}
							data={item.language_id}>
							<Link href={`/profile/${user.id}/${item.language_id}`}>
								<div className={styles.language__shadow}></div>
							</Link>
							<p className={styles.lang__name + ' text-4xl text-(--white) z-1'}>{item.language_name}</p>
							<button type='button' aria-label='Usuń' className={styles.delete_btn} onClick={onDeleteLanguage}>
								<Delete width={'2.4rem'} height={'2.4rem'} fill={'var(--white)'} />
							</button>
						</li>
					)
				})}
		</>
	)
}
