import React from 'react';
import Text from './Components/Atoms/Text';
import HeaderBar from './Components/Molecules/HeaderBar';
import Hamburger from './Components/Molecules/Hamburger';
import HeadingText from './Components/Atoms/HeadingText';

const menuItems = [
  {label:'新規投稿画面', link: '/ArticleSubmit'},
  {label:'投稿一覧画面', link: '/ArticleList'},
  {label:'マイページ', link: '/MyPage'},
  {label:'ログアウト', link: '/'},
];

const NotFound = () => {
  return (
    <div>
      <HeaderBar content={menuItems}/>
      <Hamburger/>
      <div className='mt-32'>
      <HeadingText text='404' className='text-3xl font-bold text-center'/>
      <Text content='NOT FOUND' className='text-center font-bold'/>
      <Text content='ページが見つかりませんでした' className='text-center mt-10 '/>
      </div>
    </div>
  );
}

export default NotFound;