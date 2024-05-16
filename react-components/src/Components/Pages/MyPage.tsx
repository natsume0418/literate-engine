import React, { useEffect } from 'react';
import HeaderBar from '../Molecules/HeaderBar';
import Hamburger from '../Molecules/Hamburger';
import Input from '../Atoms/Input';
import UserIcon from '../Atoms/UserIcon';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, setUserData } from '../../redux/userSlice';
import type { RootState, AppDispatch } from '../../redux/store';
import { logout } from '../../redux/CertificationSlice';

interface UserData  {
  mailAddress: string;
  userIconImage: string;
};

const handleChange = () => {
};

const MyPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.user) as unknown as UserData|null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUserData());   
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
  
    // 0.01秒後にfetchData関数を実行
    const timeoutId = setTimeout(fetchData, 10);
    // useEffectのクリーンアップ関数
    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        let parsedData: UserData = JSON.parse(storedUserData);
        if (parsedData.userIconImage.startsWith('data:image/jpeg;base64,')) {
          parsedData = {
            ...parsedData,
            userIconImage: parsedData.userIconImage.replace('data:image/jpeg;base64,', '')
          };
        }
        if (JSON.stringify(parsedData) !== JSON.stringify(userData)) {
          dispatch(setUserData(parsedData)); // Reduxの状態に反映させる
        }
      }
    }, 200);
  
    return () => clearTimeout(timeoutId);
  }, [dispatch]);
  
  // Reduxのユーザーデータが更新されたらLocalStorageに保存する
useEffect(() => {
  if (userData && userData.userIconImage) {
    // userData.userIconImageに`data:image/jpeg;base64,`を追加して保存
    const modifiedUserData = {
      ...userData,
      userIconImage: `data:image/jpeg;base64,${userData.userIconImage}`
    };
    localStorage.setItem('userData', JSON.stringify(modifiedUserData));
  }
}, [userData]);

  if (!userData) {
    return <div>読み込み中...</div>;
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    // ログアウトの処理を行い、ログイン状態を変更する
    dispatch(logout());
  };


  const menuItems = [
    { label: '新規投稿画面', link: '/ArticleSubmit' },
    { label: '投稿一覧画面', link: '/ArticleList' },
    { label: '会員情報変更画面', link: '/MemberInformation' },
    { label: 'マイページ', link: '/MyPage' },
    {label:'ログアウト', link: '/', onClick: handleLogout},
  ];

  return (
    <div>
      <HeaderBar content={menuItems} handleLogout={handleLogout}/>
      <Hamburger/>
      <div className='flex justify-center items-center mt-64 m-2/4'>
      <UserIcon src={userData && userData.userIconImage ? `data:image/jpeg;base64,${userData.userIconImage}` : 'default_icon.png'} className= 'h-16 rounded-full'/>
        <Input
          type="text"
          name="mailAddress"
          maxLength={20}
          value={userData && userData.mailAddress ? userData.mailAddress : ''}
          onChange={handleChange}
          className="border border-black w-2/4 ml-5"
        />
      </div>
    </div>
  );
}

export default MyPage;