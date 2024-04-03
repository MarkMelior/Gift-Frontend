export const CheckIcon = ({
	color = 'var(--color-main-inverted)',
	isSelected,
	...props
}) => (
	<svg
		aria-hidden='true'
		data-selected='true'
		role='presentation'
		viewBox='0 0 17 18'
		{...props}
	>
		<polyline
			fill='none'
			points='1 9 7 14 15 4'
			stroke={color}
			strokeDasharray='22'
			strokeDashoffset={isSelected ? 44 : 66}
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='1.5'
			style={{ transition: 'stroke-dashoffset 200ms ease 0s' }}
		/>
	</svg>
);
