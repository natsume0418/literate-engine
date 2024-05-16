import React, { ChangeEvent } from "react";

interface InputProps {
  name: string;
  value: string;
  type:string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className:string;
  maxLength:number;
};

const Input = ({ name, value, type,onChange,className, maxLength}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      maxLength={20}
    />
  );
};

export default Input;