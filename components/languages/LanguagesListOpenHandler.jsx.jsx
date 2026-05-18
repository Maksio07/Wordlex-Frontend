import ArrowDown from '../icons/Action/ArrowDown'
import ArrowUp from '../icons/Action/ArrowUp'
import Image from 'next/image'
import styles from './languagesList.module.css'

export default function LanguagesListOpenHandler({ onOpenList, isLanguagesListOpen, selectedLanguage }) {
	return (
		<button
			type='button'
			aria-label='Otwórz języki'
			className={
				styles.modal__box +
				' relative flex justify-end items-center w-[75%] h-12 bg-(--white) rounded-[.8rem] cursor-pointer'
			}
			onClick={onOpenList}>
			{selectedLanguage && (
				<div className='flex justify-center items-center w-full'>
					<Image
						src={selectedLanguage.firstChild.src}
						alt={selectedLanguage.firstChild.alt}
						width={32}
						height={42}
						className={styles.list__item__img}
					/>
					<p className='text-[1.6rem] text-black font-semibold'>{selectedLanguage.lastChild.innerHTML}</p>
				</div>
			)}
			<span className={styles.arrow}>
				{isLanguagesListOpen ? (
					<ArrowUp width={'2.4rem'} height={'2.4rem'} fill={'black'} />
				) : (
					<ArrowDown width={'2.4rem'} height={'2.4rem'} fill={'black'} />
				)}
			</span>
		</button>
	)
}
