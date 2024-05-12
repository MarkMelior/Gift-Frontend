import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import { FC, memo } from 'react';

export interface ConfirmModalProps {
	title?: string;
	description?: string;
	isDanger?: boolean;

	onConfirm: () => void;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export const ConfirmModal: FC<ConfirmModalProps> = memo(
	({
		title = '⚠️ Подтвердите действие',
		description = 'Вы уверены, что хотите продолжить?',
		isOpen,
		onOpenChange,
		onConfirm,
		isDanger,
	}) => {
		return (
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
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
								<Button color='primary' onPress={onClose}>
									Нет
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		);
	},
);
