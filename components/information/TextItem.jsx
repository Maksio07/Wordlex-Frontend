'use client'
import { motion } from 'framer-motion'

export default function TextItem({ customStyles, children, duration }) {
	return (
		<motion.p
			className={customStyles + ' text-(--links) text-[1.6rem] w-[50%]'}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: duration } }}>
			{children}
		</motion.p>
	)
}
