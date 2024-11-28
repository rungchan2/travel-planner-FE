import {signInWithGoogle} from '../login/auth.ts';
import { Button, Typography } from '@mui/material';
import {Google} from "@mui/icons-material";
import ModalComponent from '@/components/Modal.tsx';

const GoogleLoginModal = () => {
  
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      
    } catch (error) {
      console.error('로그인 실패: ', error);
      alert('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <ModalComponent open={true}>
        <h4>
          로그인
        </h4>
        <p>
          여행플래너를 시작하기 위해<br/>
          구글 로그인이 필요합니다.
        </p>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{
            display: "flex",
            gap: 2,
            height: 50,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Google fontSize="medium" />
          <Typography variant="body2" component="span">
            Google 계정으로 시작하기
          </Typography>
        </Button>
    </ModalComponent>
  );
};

export default GoogleLoginModal;
