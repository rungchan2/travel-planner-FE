import React from "react";

interface TextInputProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  onChange
}) => (
  <div>
    <label>{label}</label>
    <input type="text" onChange={onChange}/>
  </div>
)


export default TextInput;