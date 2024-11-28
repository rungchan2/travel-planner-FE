import styled from 'styled-components';
import { Button } from '@mui/material';
import { signOut } from '@/components/login/auth.ts';
import { AlertTriangleIcon } from 'lucide-react';
import ModalComponent from '@/components/Modal.tsx';

interface LogoutModalProps {
	open: boolean;
	onClose: () => void;
}


function LogoutModal({ open, onClose }: LogoutModalProps) {
	const handleConfirm = () => {
		signOut();
		onClose();
	};
	return (
		<ModalComponent open={ open } onClose={ onClose }>
			<TitleSection>
					<AlertTriangleIcon />
				<h5>로그아웃 하시겠습니까?</h5>
			</TitleSection>
			<BtnSection>
					<Button
						variant="contained"
						color="primary"
						onClick={ handleConfirm }
						sx={ {
							display: 'flex',
							gap: 2,
							height: 50,
							width: '100%',
							alignItems: 'center',
						} }
					>확인</Button>
				<Button
						variant="outlined"
						color="primary"
						onClick={ onClose }
						sx={ {
							display: 'flex',
							gap: 2,
							height: 50,
							width: '100%',
							alignItems: 'center',
						} }
				>취소</Button>
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
export default LogoutModal;