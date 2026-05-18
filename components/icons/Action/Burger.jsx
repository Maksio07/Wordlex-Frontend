export default function Burger({width, heigth, stroke}) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width={width} height={heigth} viewBox='0 0 24 24'>
			<path
				fill='none'
				stroke={stroke}
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2.5'
				d='M3 6h18M3 12h18M3 18h18'
			/>
		</svg>
	)
}
