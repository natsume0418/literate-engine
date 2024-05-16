import React from 'react';
import Label from '../Atoms/Label';
import Textarea from '../Atoms/Textarea';

interface InputArticleProps {
  value:string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows:number;
  cols:number;
  className:string;
  label: string;
  name:string;
  maxLength:number;
};

const InputArticle = ({
  value,
  onChange,
  rows,
  cols,
  className,
  label,
  name,
}:InputArticleProps) => {
  return (
    <div>
        <div className='flex'>
        <Label label ={label} className=' '/>
      </div>
      <div className='flex'>
        <Textarea
          value={value}
          onChange={onChange}
          rows={rows}
          cols={cols}
          className={className}
          name={name}
          maxLength={100}
        />
      </div>
    </div>
  );
}

export default InputArticle;