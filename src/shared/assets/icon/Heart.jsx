export const HeartIcon = ({
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
			d='M14.7286 18.5172L14.7281 18.5176C14.2047 18.9311 13.7221 19.3064 13.2525 19.5808C12.7827 19.8554 12.3731 20 12 20C11.627 20 11.2175 19.8552 10.7475 19.5806C10.2778 19.306 9.79514 18.931 9.27148 18.5183C8.98456 18.292 8.69091 18.0656 8.39426 17.8369C7.13929 16.8694 5.83068 15.8606 4.75159 14.6456C3.43455 13.1627 2.5 11.4124 2.5 9.13699C2.5 6.89254 3.76857 4.99736 5.52034 4.19675C7.24056 3.41056 9.51761 3.64311 11.6397 5.84866L12 6.2231L12.3603 5.8487C14.4823 3.64365 16.7594 3.41129 18.4796 4.19761C20.2314 4.99835 21.5 6.89354 21.5 9.13799C21.5 11.4129 20.5657 13.1632 19.2488 14.646C18.1679 15.863 16.8565 16.8732 15.5992 17.8416C15.3048 18.0684 15.0134 18.2929 14.7286 18.5172Z'
			fill='none'
			stroke={color}
		/>
	</svg>
);
