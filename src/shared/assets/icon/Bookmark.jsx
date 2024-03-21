export const BookmarkIcon = ({
	color = 'var(--color-main-inverted)',
	...props
}) => (
	<svg
		width='20'
		height='21'
		viewBox='0 0 20 21'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<g clipPath='url(#clip0_1201_1103)'>
			<path
				d='M3.33325 4.66669C3.33325 4.00365 3.59664 3.36776 4.06549 2.89892C4.53433 2.43008 5.17021 2.16669 5.83325 2.16669H14.1666C14.8296 2.16669 15.4655 2.43008 15.9344 2.89892C16.4032 3.36776 16.6666 4.00365 16.6666 4.66669V18.0234C16.6666 19.04 15.5166 19.6317 14.6899 19.0409L9.99992 15.6909L5.30992 19.0409C4.48242 19.6325 3.33325 19.0409 3.33325 18.0242V4.66669Z'
				fill={color}
			/>
		</g>
		<defs>
			<clipPath id='clip0_1201_1103'>
				<rect
					width='20'
					height='20'
					fill={color}
					transform='translate(0 0.5)'
				/>
			</clipPath>
		</defs>
	</svg>
);
