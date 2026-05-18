import styles from './stats.module.css'

export default function Counter({ counterData, maxValue }) {
	const radius = 70
	const strokeWidth = 10
	const normalizedRadius = radius - strokeWidth / 2
	const circumference = normalizedRadius * 2 * Math.PI
    const offset = circumference - (counterData / maxValue) * circumference;

	return (
		<div className={`${styles.counter__box}`}>
			<svg height={radius * 2} width={radius * 2}>
				<circle
					stroke='rgba(187, 176, 176, 0.563)'
					fill='transparent'
					strokeWidth={strokeWidth}
					r={normalizedRadius}
					cx={radius}
					cy={radius}
				/>
				<circle
					stroke='var(--navigationBackground)'
					fill='transparent'
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.1s linear' }}
					r={normalizedRadius}
					cx={radius}
					cy={radius}
				/>
				<text x='50%' y='50%' dy='.3em' textAnchor='middle' fill='var(--title)' className={`text-6xl`}>
					{counterData}
				</text>
			</svg>
		</div>
	)
}
