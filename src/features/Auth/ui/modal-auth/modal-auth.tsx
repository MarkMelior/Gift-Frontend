'use client';

import { Notification } from '@/entities/notification';
import { getUserState } from '@/entities/user';
import { CheckIcon } from '@/shared/assets/icon/Check';
import { Component } from '@/shared/lib/components';
import { BackgroundColorSpin } from '@/shared/ui/animate-background';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Tab,
	Tabs,
} from '@nextui-org/react';
import Image from 'next/image';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import cls from './modal-auth.module.scss';
import { ModalFormLogin } from './modal-form-login';
import { ModalFormRegister } from './modal-form-register';

export interface ModalAuthProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const ModalAuth: FC<ModalAuthProps> = ({ isOpen, onOpenChange }) => {
	const [showNotification, setShowNotification] = useState(false);
	const [selected, setSelected] = useState('login');
	const {
		data: user,
		isLoading: isLoadingUser,
		error,
	} = useSelector(getUserState);

	return (
		<>
			<Component isRender={isOpen} delayClose={6000}>
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					placement='center'
					className={cls.wrapper}
				>
					<ModalContent>
						{(onClose) => (
							<BackgroundColorSpin className={cls.modal}>
								<ModalHeader className={cls.header}>
									<Image
										src='/images/icons/logo-melior-white.svg'
										width={24}
										height={24}
										alt='test'
									/>
									{selected === 'register' ? 'Регистрация' : 'Вход'}
								</ModalHeader>
								<ModalBody className={cls.body}>
									<Tabs
										selectedKey={selected}
										onSelectionChange={(key) => setSelected(key.toString())}
										fullWidth
										size='md'
										aria-label='Tabs form'
										className={cls.tabs}
									>
										<Tab key='login' title='Вход' className={cls.tab}>
											<ModalFormLogin
												onSubmit={() => {
													onOpenChange(false);
													setShowNotification(true);
												}}
											/>
										</Tab>
										<Tab key='register' title='Регистрация' className={cls.tab}>
											<ModalFormRegister
												onSubmit={() => {
													onOpenChange(false);
													setShowNotification(true);
												}}
											/>
										</Tab>
									</Tabs>
								</ModalBody>
							</BackgroundColorSpin>
						)}
					</ModalContent>
				</Modal>
				{showNotification && (
					<Notification
						message={`${user?.username}, добро пожаловать!`}
						duration={5000}
						placement='top'
						onClose={() => setShowNotification(false)}
						closeOnClick
						startContent={
							<CheckIcon
								width={16}
								height={16}
								color='hsl(var(--gift-success))'
								isSelected
							/>
						}
					/>
				)}
			</Component>
		</>
	);
};

export default ModalAuth;
