import { render, screen } from '@testing-library/react';
import { default as Button } from './button';

jest.mock('react-redux', () => ({
	useDispatch: jest.fn(),
	useSelector: jest.fn(),
}));

describe('Button', () => {
	test('Test render', () => {
		render(<Button>TEST</Button>);
		expect(screen.getByText('TEST')).toBeInTheDocument();
	});

	test('Test slice theme', () => {
		render(<Button slice>TEST</Button>);
		expect(screen.getByText('TEST')).toHaveClass('slice');
		screen.debug();
	});
});
