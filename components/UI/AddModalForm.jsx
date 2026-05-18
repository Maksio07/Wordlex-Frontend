import { useEffect } from 'react'
import ModalForm from './ModalForm'
import Xicon from '../icons/Action/Xicon'
import styles from './ui.module.css'

export default function AddModalForm({ onClose, customStyles, title, buttonCaption, onSubmit, saving, children }) {
	useEffect(() => {
		const closeModal = e => {
			if (e.key === 'Escape') {
				onClose()
			}
		}
		window.addEventListener('keydown', closeModal)

		return () => {
			window.removeEventListener('keydown', closeModal)
		}
	}, [onClose])

	return (
		<ModalForm
			customStyles={`${styles.modal} ` + customStyles}
			title={title}
			buttonCaption={buttonCaption}
			onSubmit={onSubmit}
			saving={saving}>
			<button
				type='button'
				aria-label='Zamknij'
				className={`${styles.close__btn} absolute top-2 right-2 cursor-pointer z-10`}
				onClick={onClose}>
				<Xicon width={'2.8rem'} heigth={'2.8rem'} stroke={'var(--white)'} />
			</button>
			{children}
		</ModalForm>
	)
}
