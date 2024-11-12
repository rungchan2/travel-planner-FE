import React from 'react';
import {Button} from "@mui/material";

type TSubmitButtonProps = {
  onClick?: () => void;
  children?: string;
};

const SubmitButton: React.FC<TSubmitButtonProps> = ({onClick, children}) => (
  <Button
    variant="contained"
    type="submit"
    sx={{width: '100%'}}
    onClick={onClick} // 전달된 onClick 핸들러를 적용
  >
    {children}
  </Button>
);

export default SubmitButton;
