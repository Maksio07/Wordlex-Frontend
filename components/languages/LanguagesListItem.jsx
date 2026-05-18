import languages from '../../data/languages.json'
import Image from 'next/image'
import styles from './languagesList.module.css'

export default function LanguagesListItem() {
	return (
		<>
			{languages.map(language => {
				return (
					<li key={language.id} id={language.language_id} className={`flex justify-start items-center ${styles.list__item}`} >
						<Image
							src={language.img_path}
							width={20}
							height={20}
							alt={'Flaga ' + language.name}
							className={` h-[3.2rem] w-[4.2rem] ${styles.list__item__img}`}
						/>
						<p className='text-[1.6rem] text-(--title) font-semibold'>{language.name}</p>
					</li>
				)
			})}
		</>
	)
}
