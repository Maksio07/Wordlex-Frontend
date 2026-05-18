import AddButton from './AddButton'
import styles from './ui.module.css'

export default function UlList({
	customStyles,
	customBtnStyles,
	buttonText,
	btnIconIsActive,
	onClick,
	loading,
	loadingMessage,
	children,
}) {
	return (
		<>
			{loading ? (
				<p className={`${styles.ul_loading}`}>{loadingMessage}...</p>
			) : (
				<ul className={`${styles.ul__list} ${customStyles}`}>
					<li>
						<AddButton
							customStyles={customBtnStyles}
							buttonText={buttonText}
							plusIsActive={btnIconIsActive}
							onClick={onClick}
						/>
					</li>
					{children}
				</ul>
			)}
		</>
	)
}
