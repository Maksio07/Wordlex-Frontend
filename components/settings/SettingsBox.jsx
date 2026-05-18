import { motion } from 'motion/react'
import useWindowSize from '../../hooks/useWindowSize'
import styles from './settingsBox.module.css'

export default function SettingsBox({ customStyles, children }) {
	const { width } = useWindowSize()

	const myVariants = {
		hidden: {
			opacity: 0,
			...(width < 675 ? { y: -22 } : { x: -22 }),
		},
		visible: {
			opacity: 1,
			y: 0,
			x: 0,
		},
	}

	return (
		<motion.div
			key={width < 675 ? 'mobile' : 'desktop'}
			className={`${styles.box} relative flex flex-col flex-wrap items-center w-[75%] h-260 bg-(--settings) ${customStyles}`}
			variants={myVariants}
			initial='hidden'
			animate='visible'
			transition={{ duration: 0.5 }}>
			{children}
		</motion.div>
	)
}
