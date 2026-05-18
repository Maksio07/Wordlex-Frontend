import Burger from '@/components/icons/Action/Burger'
import Xicon from '@/components/icons/Action/Xicon'
import styles from './navigation.module.css'

export default function MobileNavigationHandler({ isOpen, onOpenNavigation }) {
	return (
		<button
			type='button'
			onClick={onOpenNavigation}
			aria-label='Open/close navigation'
			className={styles.mobile__navigation__handler + ' p-1.5 cursor-pointer'}>
			{isOpen ? (
				<Xicon width={'2.8rem'} heigth={'2.8rem'} stroke={'var(--links)'} />
			) : (
				<Burger width={'2.8rem'} heigth={'2.8rem'} stroke={'var(--links)'} />
			)}
		</button>
	)
}
