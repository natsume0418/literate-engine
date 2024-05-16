import React from 'react';
import UserIcon from '../Atoms/UserIcon';
import main from "../../imgIcon/main.jpg";
import { Link } from 'react-router-dom';

interface HeaderBarProps {
  content: { label: string; link: string, onClick?: () => void }[]; // content オブジェクトに onClick を追加
  handleLogout?: () => void; // handleLogout をプロップとして追加
};

  const HeaderBar = ({ content, handleLogout }: HeaderBarProps) => {

  return (
    <nav className="flex justify-center bg-gray-300 lg:w-9/12 lg:mx-auto">
      <Link to='/'>
      <UserIcon src={main} className="h-10 my-2 sm:ml-14"/>
      </Link>
      <ul className='hidden sm:flex grow justify-around'>
        {content.map((item, index) => (
          <li key={index} className='m-4'>
            <Link to={item.link} onClick={item.onClick}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
};

export default HeaderBar;
