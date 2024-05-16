//画像
import React from 'react';
import main from "../../imgIcon/main.jpg"

interface IconProps {
  className:string;
};

const Icon = ({className}:IconProps) => {
  return (
    <div>
      <img src={main} alt='Icon' className={className}/>
    </div>
  );
};

export default Icon;