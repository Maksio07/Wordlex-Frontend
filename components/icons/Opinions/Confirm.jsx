export default function Confirm({ width, height, stroke, customStyles }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 20 20'
			fill='none'
			stroke={stroke}
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className={customStyles + ' icon-tabler icons-tabler-outline icon-tabler-check'}>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M5 12l5 5l10 -10' />
		</svg>
	)
}
