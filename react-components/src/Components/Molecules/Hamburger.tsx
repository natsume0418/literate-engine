import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, logout } from '../../redux/CertificationSlice';
import { Link } from 'react-router-dom';
import '../../style.css';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    console.log('ログアウトボタンがクリックされました。');
    // ログアウトの処理を行い、ログイン状態を変更する
    dispatch(logout());
  };

  return (
    <div>
      <div onClick={toggleMenu} className="burger-icon sm:hidden absolute top-0 right-0 mr-4 mt-3 cursor-pointer">
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </div>
      {isOpen && (
        <div className="menu sm:hidden absolute -mt-3 left-0 w-full flex flex-col">
          {/* ログイン済みでない場合にのみログインと会員登録を表示 */}
          {!isLoggedIn && (
            <>
              <Link to='/login' onClick={toggleMenu} className="menu-item border-t border-black">
                ログイン
              </Link>
              <Link to='/memberRegistration' onClick={toggleMenu} className="menu-item">
                会員登録
              </Link>
            </>
          )}
          {/* ログイン済みの場合はマイページとログアウトを表示 */}
          {isLoggedIn && (
            <>
              <Link to='MyPage' onClick={toggleMenu} className="menu-item">
                マイページ
              </Link>
              <Link to ='/' onClick={handleLogout} className="menu-item">
                ログアウト
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Hamburger;

