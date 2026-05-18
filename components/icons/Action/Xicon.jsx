export default function Xicon({ width, heigth, fill, stroke }) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width={width} height={heigth} viewBox='0 0 24 24'>
			<path
				fill={fill}
				stroke={stroke}
				// stroke='rgb(252, 236, 236)'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				d='M18 6L6 18M6 6l12 12'
			/>
		</svg>
	)
}
