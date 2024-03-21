import { SpinnerProps, useSpinner } from '@nextui-org/react';
import { FC, forwardRef } from 'react';

export interface LoaderProps extends SpinnerProps {}

export const Loader: FC = forwardRef<HTMLDivElement, LoaderProps>(
	(props, ref) => {
		const { slots, classNames, label, getSpinnerProps } = useSpinner({
			...props,
		});

		return (
			<>
				{/* <Portal element={document.body}> */}
				{/* <span className={cls.loader} /> */}
				{/* </Portal> */}
				<div ref={ref} {...getSpinnerProps()}>
					<div className={slots.wrapper({ class: classNames?.wrapper })}>
						<i className={slots.circle1({ class: classNames?.circle1 })} />
						<i className={slots.circle2({ class: classNames?.circle2 })} />
					</div>
					{label && (
						<span className={slots.label({ class: classNames?.label })}>
							{label}
						</span>
					)}
				</div>
			</>
		);
	},
);
