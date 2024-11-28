import styled from 'styled-components';
import { Button } from '@mui/material';
import { AlertTriangleIcon } from 'lucide-react';
import ModalComponent from '@/components/Modal.tsx';
// import { redirect } from 'react-router-dom';

interface ModalProps {
	text?: string;
	onClick?: () => void;
	open: boolean;
	onClose: () => void;
}


function GoToMainModal({ open, onClose, text }: ModalProps) {
	const handleConfirm = () => {
		// redirect('/');
		onClose();
	};
	return (
		<ModalComponent open={ open } onClose={ onClose }>
			<TitleSection>
					<AlertTriangleIcon />
				<h5>{ text }</h5>
			</TitleSection>
			<BtnSection>
					<Button
						variant="contained"
						color="primary"
						onClick={handleConfirm}
						sx={ {
							display: 'flex',
							gap: 2,
							height: 50,
							width: '100%',
							alignItems: 'center',
						} }
					>확인</Button>
			</BtnSection>
		
		</ModalComponent>
	);
}

const TitleSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;


const BtnSection = styled.div`
        display: flex;
        gap: 12px;
        align-items: center;
        width: 100%;
`;
export default GoToMainModal;