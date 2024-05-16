import { rest } from 'msw'
import { useNavigate } from 'react-router-dom';

let tokenIssueTime = null;
let userData = [];
let articleData = [];
let currentId = localStorage.getItem('currentId') ? parseInt(localStorage.getItem('currentId')) : 1;


// APIエラーを返す関数
const createAPIError = (status, message) => {
  return {
    errors: [
      {
        status,
        message,
      },
    ],
  };
};


export const handlers = [
  
  //会員登録機能
  rest.post('/user',async(req, res, ctx) => {
    const bodyJson =  await req.json();
    const { mailAddress,userIconImage, nickName } = bodyJson;

    userData = {
      mailAddress,
      userIconImage,
      nickName,
    };

    return res(
      ctx.json({}),
      ctx.status(200)
    );
  }),

  //ログインページ
  rest.post('/login', async(req, res, ctx) => {
    tokenIssueTime = Date.now(); // トークンの発行時間を記録

    return res(
      ctx.json(
        {
            "user_id": "6850e3be-ff6a-4706-9157-d2bab23ff47d",
            "name": "リアクト太郎",
            "email": "react.tarou@example.com",
            "password": "$2y$10$t3YXwx0AEPLFKZTqV/Xs3eBvnVOgR/oatY6JjTpRMzN9eJlzFAxgO",
            "created_at": "2022-03-29T01:45:22.000000Z",
            "updated_at": "2022-03-29T01:45:22.000000Z",
            "deleted_at": null,
            "representative_image": "https://laravel-study-shinoda.s3.ap-northeast-1.amazonaws.com/user/6850e3be-ff6a-4706-9157-d2bab23ff47d",
            "token": "4|tPK6mcUklKR26ngBcRwdPEhVwGn5vJrY9B5gNSir"
        }
      ),
      ctx.status(200)
    );
  }),

  rest.get('/login/checkToken', (req, res, ctx) => {
    const ONE_HOUR_IN_MS = 60 * 60 * 1000
    //トークンの発行から1時間以上経過しているかどうかを判定
    const isTokenExpired = Date.now() - tokenIssueTime > ONE_HOUR_IN_MS;
    return res(
      ctx.json({valid: !isTokenExpired }),
      ctx.status(200)
      );
  }),

    //マイページ
    rest.get('/user_id', (req, res, ctx) => {
      return res(
        ctx.json({userData}),
        ctx.status(200)
      );
    }),  

    
    //記事投稿ページ
    rest.post('/articles',async(req, res, ctx) => {
      const body =  await req.json();
      const { title,content } = body;
      
      // 新しい記事を追加する前にarticleDataをリセットする
      articleData = [];

      articleData.push({
        title,
        content,
        id:currentId,
      });

      currentId++;

      // currentIdをローカルストレージに保存
      localStorage.setItem('currentId', currentId.toString());
    
      return res(
        ctx.json({arrticle_id:currentId -1}),
        ctx.status(200)
      );
    }),

    //記事投稿一覧、詳細ページ
    rest.get('/article',async(req, res, ctx) => {
    return res(
      ctx.json({articleData, userData}),
      ctx.status(200)
      );
    }),

    //会員情報変更ページ
    rest.put('/user', async (req, res, ctx) => {
      const bodyJson = await req.json();
      const { mailAddress, userIconImage, nickName } = bodyJson;
    
      // 既存のユーザーデータを更新
      userData = {
        mailAddress,
        userIconImage,
        nickName,
      };
    
      return res(
        ctx.json({}),
        ctx.status(200)
      );
    }),
    
    // 400エラー
  rest.post('/400', async (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json(createAPIError(400, 'APIエラーが発生しました'))
    );
  }),

  // 401エラー
  rest.post('/401', async (req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json(createAPIError(401, '認証エラーが発生しました'))
    );
  }),

  // 404エラー
  rest.post('/404', async (req, res, ctx) => {
    const navigate = useNavigate();
    navigate('/NotFound')
    return res(
      ctx.status(404),
      ctx.json(createAPIError(404, 'APIが見つかりません'))
    );
  }),

  // 500エラー
  rest.post('/500', async (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json(createAPIError(500, 'サーバーエラーが発生しました'))
    );
  }),

   // 400エラー
  rest.get('/400', async (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json(createAPIError(400, 'APIエラーが発生しました'))
    );
  }),

  // 401エラー
  rest.get('/401', async (req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json(createAPIError(401, '認証エラーが発生しました'))
    );
  }),

  // 404エラー
  rest.get('/404', async (req, res, ctx) => {
    const navigate = useNavigate();
    navigate('/NotFound')
    return res(
      ctx.status(404),
      ctx.json(createAPIError(404, 'APIが見つかりません'))
    );
  }),

  // 500エラー
  rest.get('/500', async (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json(createAPIError(500, 'サーバーエラーが発生しました'))
    );
  }),
];