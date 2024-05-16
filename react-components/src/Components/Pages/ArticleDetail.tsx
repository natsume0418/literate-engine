import React, { useEffect, useState } from 'react';
import HeaderBar from '../Molecules/HeaderBar';
import Hamburger from '../Molecules/Hamburger';
import Textarea from '../Atoms/Textarea';
import HeadingText from '../Atoms/HeadingText';
import { setNewPostFlag } from '../../redux/articleListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchArticleDetailData } from '../../redux/ArticleDetailSlice';
import { useParams } from 'react-router-dom';
import { setUserArticles } from '../../redux/userArticle';
import { setArticleContent } from '../../redux/DetailSlice';
import { logout } from '../../redux/CertificationSlice';

const handleChange = () => {
  console.log()
};

const ArticleDetail = () => {

  const dispatch = useDispatch<AppDispatch>();
  const articleContent = useSelector((state: RootState) => state.detail.content);
  const [nickName, setNickName] = useState<string | null>('デフォルトのニックネーム');
  const { id } = useParams();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    // ログアウトの処理を行い、ログイン状態を変更する
    dispatch(logout());
  };

  const menuItems = [
    {label:'新規投稿画面', link: '/ArticleSubmit'},
    {label:'マイページ', link: '/MyPage'},
    {label:'ログアウト', link: '/', onClick: handleLogout},
  ];

  useEffect(() => {
    const fetchData = async (id:string) => {
      try {
        await dispatch(fetchArticleDetailData(id));
      } catch (error) {
        console.error('Failed to data:', error);
      }
    };
  
    // 0.01秒後にfetchData関数を実行
    const timeoutId = setTimeout(fetchData, 10);
    // useEffectのクリーンアップ関数
    return () => clearTimeout(timeoutId);
  }, [dispatch,id]);

    // articleDetail コンポーネントがマウントされたときに newPostFlag をリセットする
    useEffect(() => {
      // newPostFlag を false に設定するアクションをディスパッチする
      dispatch(setNewPostFlag(false));
    }, [dispatch]);

    useEffect(() => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          const storedNickName = parsedUserData.nickName;
          if (storedNickName) {
            setNickName(storedNickName); // ニックネームをstateに設定
          }
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      }
    }, [dispatch]);

    useEffect(() => {
      const fetchData = () => {
        const storedArticleData = localStorage.getItem('userArticleData');
        if (storedArticleData) {
          const parsedData = JSON.parse(storedArticleData);
          const targetArticle = parsedData.find((article: any) => article.id === parseInt(id || ''));
          if (targetArticle) {
            // 記事データを Redux の状態に反映させる
            dispatch(setUserArticles(parsedData));
            dispatch(setArticleContent(`${targetArticle.title}\n\n${targetArticle.content}`));
          }
        }
      }
    
      // 1秒後にfetchData関数を実行
      const timeoutId = setTimeout(fetchData, 15);
      // useEffectのクリーンアップ関数
      return () => clearTimeout(timeoutId);
    }, [dispatch, id]);

    const contentWithNickName = `投稿者: ${nickName}\n\n${articleContent}`;

  return (
    <div>
      <HeaderBar content={menuItems} handleLogout={handleLogout}/>
      <Hamburger/>
      <div className='w-9/12 mx-auto'>
      <HeadingText text='投稿詳細画面' className='text-center my-10 text-3xl font-bold'/>
      <Textarea
          name='content'
          value={contentWithNickName}
          onChange={handleChange}
          rows={10}
          cols={40}
          maxLength={100}
          className="border border-black w-full"
        />
      </div>
    </div>
  );
}

export default ArticleDetail;