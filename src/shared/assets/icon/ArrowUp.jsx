export const ArrowUpIcon = ({
	color = 'var(--color-main-inverted)',
	...props
}) => (
	<svg
		width='20'
		height='20'
		viewBox='0 0 20 20'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M10 4.16669L15 9.16669M10 4.16669L5 9.16669M10 4.16669V15.8334'
			stroke={color}
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);
