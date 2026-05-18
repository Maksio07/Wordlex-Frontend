'use client'

import { motion } from 'motion/react'
import SubmitButton from './SumbitButton'
import styles from './ui.module.css'

export default function ModalForm({ customStyles, children, onSubmit, title, buttonCaption, ariaLabel, saving }) {
	return (
		<motion.form
			className={
				styles.ui__modal +
				' flex flex-col justify-evenly items-center bg-(--navigationBackground) rounded-[.8rem] max-[450px]:w-lg max-[360px]:w-104 ' +
				customStyles
			}
			onSubmit={onSubmit}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.6 } }}>
			<h2 className={styles.ui__modal__title + ' text-[2.6rem] font-bold text-(--links) text-center'}>{title}</h2>
			{children}
			<SubmitButton type='submit' ariaLabel={ariaLabel}>
				{saving ? 'Zapisuję...' : buttonCaption}
			</SubmitButton>
		</motion.form>
	)
}
