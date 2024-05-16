import React, { ChangeEvent } from 'react';
import Label from '../Atoms/Label';
import Input from '../Atoms/Input';

interface InputFormProps {
  name: string;
  value: string;
  type:string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className:string;
  label: string;
  maxLength:number;
};

//Input+Label
const InputForm = ({
  name,
  value,
  type,
  onChange,
  className,
  label,
}:InputFormProps) => {
  return (
    <>
      <Label label={label} className={''}/>
      <Input name={name} value={value} type={type} onChange={onChange} maxLength={20} className={className}/>
    </>
    );
  };

export default InputForm;