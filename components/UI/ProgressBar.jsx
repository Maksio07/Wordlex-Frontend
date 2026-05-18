import { useState, useEffect } from 'react'
import styles from './ui.module.css'

export default function ProgressBar({ data, currentIndex }) {
	const [progressData, setProgressData] = useState(0)

	const handleProgressData = () => {
		setProgressData(data.length - 1 === 0 ? 100 : ((currentIndex / (data.length - 1)) * 100).toFixed(2))
	}

	useEffect(() => {
		handleProgressData()
	}, [currentIndex])

	return (
		<div
			className={`${styles.progress} flex items-center justify-center after:w-(--progress-width)`}
			style={{ '--progress-width': `${progressData}%` }}>
			<p className='text-center text-2xl font-medium color-(--title) z-10'>{currentIndex + 1}/{data.length}</p>
		</div>
	)
}
