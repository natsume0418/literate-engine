import React from 'react';
import TOPPage from '../Organisms/TOPPage';
import Hamburger from '../Molecules/Hamburger';
import HeaderBar from '../Molecules/HeaderBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/CertificationSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/CertificationSlice';

const TOP = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleLogin = () => {
    // ログイン処理を実装する
    navigate('/Login');
  };

  const handleRegistration = () => {
    // 会員登録処理を実装する
    navigate('/MemberRegistration');
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    // ログアウトの処理を行い、ログイン状態を変更する
    dispatch(logout());
  };

  const menuItems = [
    {label:'ログイン', link: '/Login'},
    {label:'会員登録', link: '/MemberRegistration'},
    {label:'マイページ', link: '/MyPage'},
    {label:'ログアウト', link: '/', onClick: handleLogout},
  ];

  const filteredMenuItems = isLoggedIn 
  ? menuItems.filter(item => item.label !== 'ログイン' && item.label !== '会員登録') 
  : menuItems.filter(item => item.label !== 'マイページ' && item.label !== 'ログアウト');

  return (
    <div>
      <header>
        <HeaderBar content={filteredMenuItems} handleLogout={handleLogout}/>
        <Hamburger />
      </header>
      <div>
        <TOPPage onLogin={handleLogin} onRegistration={handleRegistration} isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};


export default TOP;