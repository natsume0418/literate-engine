import React from 'react';

interface UserIconProps {
  src: string;
  className: string;
  link?: string;
  onClick?: () => void;
};

const UserIcon = ({ src, className, link, onClick }: UserIconProps) => {
  if (link) {
    return (
      <a href={link}>
        <img src={src} className={className} alt="User Icon" />
      </a>
    );
  } else {
    return <img src={src} className={className} onClick={onClick} alt="User Icon" />;
  }
};

export default UserIcon;