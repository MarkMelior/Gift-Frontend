import { Component } from '@/shared/lib/components';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react';
import { FC, ReactElement, cloneElement } from 'react';

export interface ModalConfirmProps {
	children: ReactElement;
	onConfirm: () => void;
	onCancel?: () => void;

	title?: string;
	description?: string;
	isDanger?: boolean;
}

export const ModalConfirm: FC<ModalConfirmProps> = ({
	title = '⚠️ Подтвердите действие',
	description = 'Вы уверены, что хотите продолжить?',
	children,
	onConfirm,
	onCancel,
	isDanger,
}) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const childWithClick = cloneElement(children, {
		onClick: onOpen,
	});

	return (
		<>
			{childWithClick}
			<Component isRender={isOpen} delayClose={500}>
				<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className='flex flex-col gap-1'>
									{title}
								</ModalHeader>
								<ModalBody>{description}</ModalBody>
								<ModalFooter>
									<Button
										color='danger'
										variant='light'
										onPress={() => {
											onClose();
											onConfirm();
										}}
									>
										Да
									</Button>
									<Button
										color='primary'
										onPress={() => {
											onClose();
											onCancel && onCancel();
										}}
									>
										Нет
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</Component>
		</>
	);
};
