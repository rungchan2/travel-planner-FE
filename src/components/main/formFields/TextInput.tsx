import React from "react";
import {TextField} from "@mui/material";

interface TextInputProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: true | false;
  id: string;
  value: string;
  error?: boolean;
  helperText?: string;
}

function TextInput ({
  label,
  onChange,
  required,
  id,
  value,
  error,
  helperText,
}: TextInputProps) {

  return (
    <>
      <TextField
        label={label} type="text" onChange={onChange} required={required} id={id} value={value} error={error} helperText={helperText}
        sx={{width:'100%'}}
      />
    </>
  );
}


export default TextInput;
