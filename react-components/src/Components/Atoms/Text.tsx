import React from 'react';

//h1タグの内容　
interface TextProps {
 content:string;
 className:string;
};

const Text = ({content,className}:TextProps) => {
 return <p className={className}>{content}</p>
};

export default Text;