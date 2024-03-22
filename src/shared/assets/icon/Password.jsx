export const PasswordIcon = ({
	color = 'var(--color-main-inverted)',
	...props
}) => (
	<svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M12 10V14M10 13L14 11M10 11L14 13M5 10V14M3 13L7 11M3 11L7 13M19 10V14M17 13L21 11M17 11L21 13'
			stroke={color}
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);
