import styled from 'styled-components';
import { Modal, Button, Typography } from '@mui/material';
import { signOut } from '@/components/login/auth.ts';
import { AlertTriangleIcon } from 'lucide-react';

interface LogoutModalProps {
	open: boolean;
	onClose: () => void;
}

function LogoutModal({ open, onClose }: LogoutModalProps) {
	const handleLogout = () => {
		signOut();
		onClose();
	};
	
	return (
		<Modal open={ open } onClose={ onClose }>
			<Contents>
				<div className="title">
					<AlertTriangleIcon />
					<p>로그아웃 하시겠습니까?</p>
				</div>
				<div className="btn">
					<Button
						variant="contained"
						color="primary"
						onClick={ handleLogout }
						sx={ {
							display: 'flex',
							gap: 2,
							height: 50,
							width: '100%',
							alignItems: 'center',
						} }
					>
						<Typography variant="body2" component="span">확인</Typography>
					</Button>
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
					>
						<Typography variant="body2" component="span">취소</Typography>
					</Button>
				</div>
			</Contents>
		</Modal>
	);
}

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
    gap: 32px;
    align-items: center;
    border: none;
    outline: none;

    .title {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }

    p {
        line-height: 1.4;
        word-break: keep-all;
        color: #222222;
        font-size: 1.2rem;
        font-weight: 500;
    }

    svg {
        width: 30px;
        height: 30px;
    }

    .btn {
        display: flex;
        gap: 12px;
        align-items: center;

        width: 100%;
    }
`;
export default LogoutModal;