import React from 'react';
import HeadingText from '../Atoms/HeadingText';
import Input from '../Atoms/Input';
import Button from '../Atoms/Button';
import HeaderBar from '../Molecules/HeaderBar';
import Hamburger from '../Molecules/Hamburger';
import InputArticle from '../Molecules/InputAriticle';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData,selectFormData } from '../../redux/articleSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setNewPostFlag } from '../../redux/articleListSlice';
import { logout } from '../../redux/CertificationSlice';
import { addPost } from '../../redux/pageSlice';

const ArticleSubmit = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    // フォームデータを更新
    dispatch(setFormData({
      ...formData,
      [name]: value,
    }));
  };
  
  const handleSubmit = () => {
    const requestBody = {
      title: formData.title,
      content: formData.content
    };
     // ここでaxiosを使用してリクエストを送信
    axios.post('/articles', requestBody)
    .then(response =>{
      console.log('記事の投稿が成功しました');
      dispatch(setNewPostFlag(true));
      dispatch(setFormData({
        title: '',
        content: ''
      }));

      // 新しい投稿が作成されたので、handleCreatePostを呼び出す
      handleCreatePost(requestBody);
    })

    .catch(error =>{
      console.log('記事の投稿に失敗しました。エラーメッセージ:',)
      navigate('/')
    })
    navigate('/ArticleList')
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    // ログアウトの処理を行い、ログイン状態を変更する
    dispatch(logout());
  };

  const handleCreatePost = (newPostData: any) => {
    // 新しい投稿が作成されたので、addPostアクションをディスパッチします
    dispatch(addPost(newPostData));
  };
  
  
  const menuItems = [
    {label:'新規投稿画面', link: '/ArticleSubmit'},
    {label:'投稿一覧画面', link: '/ArticleList'},
    {label:'マイページ', link: '/MyPage'},
    {label:'ログアウト', link: '/', onClick: handleLogout},
  ];

  return (
    <div>
      <HeaderBar content= {menuItems} handleLogout={handleLogout}/>
      <Hamburger/>
    <div className='flex flex-col w-9/12 mx-auto'>
      <div className='mb-5'>
        <HeadingText text='新規投稿画面' className='text-center my-10 text-3xl font-bold '/>
      <div className='flex'>
        <Input
          type="text" 
          name="title"
          value={formData.title}
          onChange={handleChange}
          maxLength={20}
          className="border border-black mx-1 w-9/12 "/>
      </div>
    </div>
      <div>
        <InputArticle
          name='content'
          label="投稿内容"
          value={formData.content}
          onChange={handleChange}
          rows={10}
          cols={40}
          maxLength={100}
          className='border border-black w-full'
        />
      </div>
      <div className="flex justify-end">
      <Button
        label='投稿する'
        onClick={handleSubmit}
        className={`bg-blue-500 text-white font-bold py-1 my-10 px-4 rounded ${(!formData.title || !formData.content) ? 'opacity-50' : ''}`} 
        disabled={!formData.title || !formData.content}
      />
      </div>
    </div>
    </div>
  );
}

export default ArticleSubmit;