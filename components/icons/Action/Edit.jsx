export default function Edit({width, height, stroke}) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 32 32'>
			<path
				fill='none'
				stroke={stroke}
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				d='m30 7l-5-5L5 22l-2 7l7-2Zm-9-1l5 5ZM5 22l5 5Z'
			/>
		</svg>
	)
}
