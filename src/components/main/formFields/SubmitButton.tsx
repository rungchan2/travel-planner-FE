import React from 'react';
import {Button} from "@mui/material";

type TSubmitButtonProps = {
  onClick?: () => void;
  children?: string;
  disabled: boolean;
};

const SubmitButton: React.FC<TSubmitButtonProps> = ({onClick, children, disabled}) => (
  <Button
    variant="contained"
    type="submit"
    sx={{width: '100%', height: '48px'}}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </Button>
);

export default SubmitButton;
