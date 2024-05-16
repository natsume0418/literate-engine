import React, { useEffect } from 'react';
import HeadingText from '../Atoms/HeadingText';
import HeaderBar from '../Molecules/HeaderBar';
import Hamburger from '../Molecules/Hamburger';
import Pagination from '../Molecules/Pagenation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUserArticleData } from '../../redux/userArticle';
import { Link } from 'react-router-dom';
import { setNewPostFlag } from '../../redux/articleListSlice';
import { setUserArticles } from '../../redux/userArticle';
import { logout } from '../../redux/CertificationSlice';

interface UserArticle {
  id: string;
  title:string,
  content:string
};

const ArticleList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userArticleData = useSelector((state: RootState) => state.userArticle) as unknown as UserArticle[] | null;
  // 現在のページ番号を取得
  const currentPage = useSelector((state: RootState) => state.page.currentPage);
  const newPostFlag = useSelector((state: RootState) => state.articleList.newPostFlag);
  // 1ページあたりの記事数
  const articlesPerPage = 5;
  // 表示する記事の範囲を計算
  let currentArticles: UserArticle[] = [];
  if (userArticleData) {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    currentArticles = userArticleData.slice(startIndex, endIndex);
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (newPostFlag) {
          await dispatch(fetchUserArticleData());
          dispatch(setNewPostFlag(false));
        }
      } catch (error) {
        console.error('Failed to data:', error);
      }
    };

  // 0.01秒後にfetchData関数を実行
  const timeoutId = setTimeout(fetchData, 10);
  // useEffectのクリーンアップ関数
  return () => clearTimeout(timeoutId);
  }, [dispatch,newPostFlag]);


  // 前のページからの遷移時にローカルストレージからデータを取得してReduxの状態に反映させる
  useEffect(() => {
    const storedUserArticleData = localStorage.getItem('userArticleData');
    if (storedUserArticleData) {
      const parsedData: UserArticle[] = JSON.parse(storedUserArticleData);
      if (JSON.stringify(parsedData) !== JSON.stringify(userArticleData)) {
        dispatch(setUserArticles(parsedData)); // Reduxの状態に反映させる
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (userArticleData) {
      localStorage.setItem('userArticleData', JSON.stringify(userArticleData));
    }
  }, [userArticleData]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    // ログアウトの処理を行い、ログイン状態を変更する
    dispatch(logout());
  };

  const menuItems = [
    {label:'新規投稿画面', link: '/ArticleSubmit'},
    {label:'投稿一覧画面', link: '/ArticleList'},
    {label:'マイページ', link: '/MyPage'},
    {label:'ログアウト', link: '/', onClick: handleLogout},
  ];

  return (
  <div>
    <HeaderBar content={menuItems} handleLogout={handleLogout}/>
    <Hamburger/>
    <div className='w-9/12 mx-auto'>
      <div>
        <HeadingText text = "投稿一覧画面" className='text-center my-10 text-3xl font-bold '/>
      </div>
      <div className="table-fixed border-black p-4">
        <table className="table-fixed w-full border">
          <thead>
            <tr className='text-left'>
              <th className='border border-black'>タイトル</th>
              <th className='border border-black'>記事内容</th>
            </tr>
          </thead>
          <tbody>
            {currentArticles.map((article, index) => (
              <tr key={index}>
                <td className='border border-black p-3 break-words'>{article.title}</td>
                <td className='border border-black p-3 break-words'>
                  <Link to={`/ArticleDetail/${article.id}`} className="text-blue-500 underline">{article.content}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination/>
    </div>
  </div>
  );
}

export default ArticleList;