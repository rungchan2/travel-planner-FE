import styled from 'styled-components';
import {Box, Button, Typography} from "@mui/material";
import {Error} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Content>
      <TextArea>
        <Error fontSize='large'/>
        <Typography variant="h4" component="h2" sx={{fontWeight: 700,}}>Page Not Found</Typography>
        <Typography variant="body1" component="span">요청하신 페이지를 찾을 수 없습니다.</Typography>
      </TextArea>
      <Button variant='contained' color='primary' onClick={() => {
        navigate('/');
      }}>
        메인페이지로 이동
      </Button>
    </Content>
  )
    ;
}

const Content = styled(Box)`
    margin: 80px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    padding: 80px 0
`

const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

`


export default NotFoundPage;