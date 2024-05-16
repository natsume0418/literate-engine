import React from 'react';

//h1タグの内容　
interface HeadingProps {
  text:string;
  className:string;
};

const HeadingText = ({text,className}:HeadingProps) => {
  return <h1 className={className}>{text}</h1>
};

export default HeadingText;