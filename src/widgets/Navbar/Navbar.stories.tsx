import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
	title: 'Example/Navbar',
	component: Navbar,
	tags: ['autodocs'],
	decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
	args: {
		// children: 'Navbar',
	},
};
