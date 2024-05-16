import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, selectIsLoggedIn } from '../../redux/CertificationSlice';
import '../../style.css';
import UserIcon from '../Atoms/UserIcon';
import main from "../../imgIcon/main.jpg";

interface ContentProps {
    label: string;
    link: string;
  };
  
const Header = ({ content }: { content: ContentProps[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    dispatch(logout());
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between bg-gray-300 lg:w-9/12 lg:mx-auto">
      <div className="flex justify-center items-center">
        <Link to='/'>
          <UserIcon src={main} className="h-10 my-2 sm:ml-14" />
        </Link>
        <div onClick={toggleMenu} className="burger-icon sm:hidden absolute top-0 right-0 mr-4 mt-3 cursor-pointer">
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        </div>
      </div>
      <ul className={`${isOpen ? 'flex flex-col items-center w-full mt-3 border-t border-black justify-between sm:justify-around' : 'hidden'} sm:flex grow`}>
  {content.map((item: ContentProps, index: number) => (
    <li key={index} className='m-4 sm:flex-grow flex items-center justify-center'>
      <Link to={item.link}>{item.label}</Link>
    </li>
  ))}
  {isLoggedIn && (
    <li className='w-full py-3 border-t border-black items-center flex flex-col'>
      <Link to='/' onClick={handleLogout}>ログアウト</Link>
    </li>
  )}
</ul>
    </nav>
  );
};

export default Header;
