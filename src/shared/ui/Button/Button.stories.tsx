import CenteredDecorator from '@/shared/config/storybook/CenteredDecorator';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
	title: 'Example/Button',
	component: Button,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<CenteredDecorator>
				<Story />
			</CenteredDecorator>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: 'Button',
	},
};
