import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface CenteredDecoratorProps {
	children: ReactNode;
}

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background: #03020d;
`;

const CenteredDecorator: FC<CenteredDecoratorProps> = ({ children }) => {
	return <Wrapper>{children}</Wrapper>;
};

export default CenteredDecorator;
