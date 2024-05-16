//画像
import React from 'react';
import page from "../../imgIcon/page.jpg"

const Image = () => {
  return (
    <div>
      <img src={page} alt='Page' className=' h-50 mt-5 hidden sm:block'/>
    </div>
  );
};

export default Image;