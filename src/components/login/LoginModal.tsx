import {signInWithGoogle} from '../login/auth.ts';
import { Modal, Button, Typography } from '@mui/material';
import {Google} from "@mui/icons-material";
import styled from 'styled-components';

const GoogleLoginModal = () => {
  
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('로그인 실패: ', error);
      // alert('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <Modal open={true}>
      <Contents>
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
            display: 'flex',
            gap: 2,
            height: 50,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Google fontSize="medium"/>
          <Typography variant='body2' component='span'>Google 계정으로 시작하기</Typography>
        </Button>
      </Contents>
    </Modal>
  );
};

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
    text-align: center;
    border: none;
    outline: none;
  
  h4 {
    font-size: 36px;
    word-break: keep-all;
    font-weight: 600;
    line-height: 1;
  }
  
  p {
    line-height: 1.4;
    word-break: keep-all;
    color: #828282;
  }
`

export default GoogleLoginModal;
