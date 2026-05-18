import Delete from '../icons/Action/Delete'
import Edit from '../icons/Action/Edit'
import styles from './ui.module.css'

export default function ActionBtn({ edit = false, remove = false, onClick }) {
	return (
		<button
			type='button'
			aria-label={edit ? 'Edytuj' : 'Usuń'}
			className={`${edit ? styles.editBtn : styles.deleteBtn}`}
			onClick={onClick}>
			{remove && <Delete width={'2.4rem'} height={'2.4rem'} fill={'var(--links)'} />}
			{edit && <Edit width={'2.4rem'} height={'2.4rem'} stroke={'var(--links)'} />}
		</button>
	)
}
