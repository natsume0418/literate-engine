import React from 'react';

//h1タグの内容　
interface TextareaProps {
  value:string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows:number;
  cols:number;
  className:string;
  name:string;
  maxLength:number;
};  

const Textarea = ({
  value,
  onChange,
  rows,
  cols,
  className,
  name,
}:TextareaProps) => {
  return(
  <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      cols={cols}
      className={className}
      name={name}
      maxLength={100}
  />
);
};

export default Textarea;