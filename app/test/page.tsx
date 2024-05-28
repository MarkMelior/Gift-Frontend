'use client';

import { useMessage } from '@/shared/ui/message';
import { Button } from '@nextui-org/react';
import { FC } from 'react';

const Test: FC = () => {
	const { showMessage, contextMessages } = useMessage();

	return (
		<div className='content'>
			<Button
				color='success'
				onClick={() =>
					showMessage({
						content: 'This is a success message',
						type: 'success',
						duration: 3000,
					})
				}
			>
				Show Success Message
			</Button>
			<Button
				color='danger'
				onClick={() =>
					showMessage({
						content: 'This is an error message',
						type: 'error',
						onCancel: () => console.log('onCancel'),
					})
				}
			>
				Show Error Message
			</Button>
			{contextMessages}
		</div>
	);
};

export default Test;
