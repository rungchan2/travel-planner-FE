import styled from 'styled-components';
import React from 'react';
import { Modal } from '@mui/material';

interface ModalProps {
	children: React.ReactNode;
	className?: string;
	open: boolean;
	onClose?: () => void;
}

function ModalComponent({ children, className, open, onClose }: ModalProps) {
	return (
		<>
			<ModalStyled open={ open } onClose={ onClose } className={ className }>
				<Contents>
					{ children }
				</Contents>
			</ModalStyled>
		</>
	);
}

const ModalStyled = styled(Modal)`
    position: relative;

    h4 {
        font-size: 32px;
        word-break: keep-all;
        font-weight: 600;
        line-height: 1;
    }

    h5 {
        line-height: 1.4;
        word-break: keep-all;
        color: #222222;
        font-size: 1.2rem;
        font-weight: 500;
    }
		
		p {
				line-height: 1.4;
				word-break: keep-all;
				color: #828282;
				font-size: 1rem;
		}

    svg {
        width: 30px;
        height: 30px;
    }
`;
const Contents = styled.div`
    position: absolute;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 32px;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
    border-radius: 12px;

    display: flex;
    flex-direction: column;
    gap: 22px;
    justify-content: center;
		text-align: center;

    border: none;
    outline: none;
`;

export default ModalComponent;
