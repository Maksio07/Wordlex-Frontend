import Xicon from '../icons/Action/Xicon'
import styles from './ui.module.css'

export default function DeleteModal({ onDelete, onClose, title }) {
	return (
		<div
			className={`${styles.delete__modal} fixed top-[50%] left-[50%] w-136 h-92 bg-(--navigationBackground) rounded-[1.6rem] z-50`}>
			<button
				type='button'
				aria-label='Zamknij'
				onClick={onClose}
				className={`${styles.close__btn} absolute right-4 top-4 cursor-pointer`}>
				<Xicon width={28} heigth={28} stroke={'var(--white)'} />
			</button>
			<h2 className={`${styles.modal__title} text-3xl font-medium text-(--white) text-center mt-8`}>
				{title}
			</h2>
			<div className='flex justify-evenly'>
				<button type='button' aria-label='Tak' onClick={onDelete} className={`${styles.yes_btn}`}>
					Tak
				</button>
				<button type='button' aria-label='Nie' onClick={onClose} className={`${styles.no_btn}`}>
					Nie
				</button>
			</div>
		</div>
	)
}
