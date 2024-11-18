import React from 'react';
import {signInWithGoogle} from './auth';
import {Modal, Box, Button, Typography} from '@mui/material';
import {Google} from "@mui/icons-material";

const GoogleLoginModal = () => {
  const handleLogin = () => {
    signInWithGoogle().catch((error) => {
      console.error('로그인 오류:', error);
    });
  };

  return (
    <Modal open={true}>
      <Box
        sx={{
          position: 'absolute',
          width: '400px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'background.paper',
          padding: 4,
          boxShadow: 24,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          textAlign: 'center',
          border: 'none',
          outline: 'none'
        }}
      >
        <Typography variant="h4" component="h2" sx={{ wordBreak: 'keep-all', fontWeight: 600}}>
          로그인
        </Typography>
        <Typography variant="body1" component="span" sx={{lineHeight: 1.4, wordBreak: 'keep-all', color: '#828282'}}>
          여행플래너를 시작하기 위해<br/>
          구글 로그인이 필요합니다.
        </Typography>
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
      </Box>
    </Modal>
  );
};

export default GoogleLoginModal;
