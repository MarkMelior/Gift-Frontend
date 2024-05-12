import { Component } from '@/shared/lib/components';
import { Button, ButtonProps, useDisclosure } from '@nextui-org/react';
import { FC, ReactNode } from 'react';
import { ConfirmModal } from './confirm-modal';

export interface ConfirmButtonProps extends ButtonProps {
	children?: ReactNode;
	onConfirm: () => void;

	confirmTitle?: string;
	confirmDescription?: string;
	confirmIsDanger?: boolean;
}

export const ConfirmButton: FC<ConfirmButtonProps> = (props) => {
	const {
		confirmTitle,
		children,
		onConfirm,
		confirmDescription,
		confirmIsDanger,
		...otherProps
	} = props;
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Button
				// @ts-ignore
				{...otherProps}
				onClick={(event) => {
					onOpen();
					if (otherProps.onClick) {
						otherProps.onClick(event);
					}
				}}
			>
				{children}
			</Button>
			<Component isRender={isOpen} delayClose={500}>
				<ConfirmModal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					onConfirm={onConfirm}
					title={confirmTitle}
					description={confirmDescription}
					isDanger={confirmIsDanger}
				/>
			</Component>
		</>
	);
};
