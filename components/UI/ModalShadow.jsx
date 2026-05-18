import styles from './ui.module.css'

export default function ModalShadow({ onCloseModal }) {
	return <div className={styles.modal__shadow} onClick={onCloseModal}></div>
}
