export const CrossIcon = ({
	color = 'var(--color-main-inverted)',
	...props
}) => (
	<svg
		width='11'
		height='11'
		viewBox='0 0 11 11'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M1 1L5.5 5.5M10 10L5.5 5.5M5.5 5.5L10 1M5.5 5.5L1 10'
			stroke={color}
			strokeLinecap='round'
		/>
	</svg>
);
