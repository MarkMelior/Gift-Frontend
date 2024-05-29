export const UserIcon = ({
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
			d='M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z'
			stroke={color}
		/>
		<path
			d='M19.998 18C20 17.836 20 17.669 20 17.5C20 15.015 16.418 13 12 13C7.582 13 4 15.015 4 17.5C4 19.985 4 22 12 22C14.231 22 15.84 21.843 17 21.563'
			stroke={color}
			strokeLinecap='round'
		/>
	</svg>
);
