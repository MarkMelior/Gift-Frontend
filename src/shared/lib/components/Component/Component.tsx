import { FC, ReactNode, useEffect, useState } from 'react';

interface ComponentProps {
	children: ReactNode;
	isRender?: boolean;
	delayOpen?: number;
	delayClose?: number;
}

export const Component: FC<ComponentProps> = ({
	isRender = true,
	children,
	delayOpen,
	delayClose,
}) => {
	const [shouldRender, setShouldRender] = useState(isRender);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		if (!isRender) {
			timeoutId = setTimeout(() => {
				setShouldRender(false);
			}, delayClose);
		} else {
			timeoutId = setTimeout(() => {
				setShouldRender(true);
			}, delayOpen);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [delayClose, delayOpen, isRender]);

	return shouldRender ? <>{children}</> : <></>;
};
