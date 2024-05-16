import React, { ChangeEvent, useState } from "react";
import Button from "../Atoms/Button"; 
import HeadingText from "../Atoms/HeadingText";
import Hamburger from "../Molecules/Hamburger";
import HaderBar from "../Molecules/HeaderBar";
import OrganismsInputForm from "../Organisms/OrganismsLogin";
import { useDispatch, useSelector } from "react-redux";
import { selectFormErrors,selectTouched,setFormErrors, setTouched } from "../../redux/formSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../redux/CertificationSlice";

interface FormValues {
  mailAddress: string;
  password: string;
};

interface FormErrors {
  mailAddress: string;
  password: string;
};

const Login = () => {
  const [formData, setFormData] = useState({
    mailAddress:"",
    password:"",
  });

  const dispatch = useDispatch();
  const formErrors = useSelector(selectFormErrors);
  const touched: { [key: string]: boolean } = useSelector(selectTouched);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 入力値を更新する
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:value,
    });

    const isFieldTouched = touched[name];
    // フィールドがフォーカスされている場合はバリデーションを実行
    if (isFieldTouched) {
      const updatedFormData = {
        ...formData,
        [name]: value,
      };
      const errors = validate(updatedFormData);
      dispatch(setFormErrors(errors));
    };
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    dispatch(setTouched(allTouched));
    // ログインボタンがクリックされたときの処理
    const errors = validate(formData);
    dispatch(setFormErrors(errors));

    if (Object.keys(errors).length === 0){
        // ここでaxiosを使用してリクエストを送信
        axios.post('/login', formData)
        .then(response => {
            // リクエストが成功した場合の処理
            console.log('ログインしました。');
            const accessToken = response.data.token;
            // access_tokenをlocalStorageに保存
            localStorage.setItem('access_token', accessToken);
            // axiosのデフォルトヘッダーにAuthorizationを設定
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            // ログイン状態を更新する
            dispatch(login());  // ログイン状態を更新
            navigate('/MyPage');
        })
        .catch(error => {
            // リクエストが失敗した場合の処理
            console.error('ログインに失敗しました。エラーメッセージ:', error.message);
        });
      }
      //指定された間隔でコードを実行
      setInterval(() => {
        axios.get('/login/checkToken')
        .then(response => {
          //valid トークンの有効性を示す
            if (response.data.valid === false) {
                // トークンが無効な場合、ユーザーをログアウト
                localStorage.removeItem('access_token');
                axios.defaults.headers.common['Authorization'] = '';
                navigate('/Login');
            }
        })
        .catch(error => {
            console.error('トークンの確認に失敗しました。エラーメッセージ:', error.message);
        });
      }, 60000); // 60秒ごとにトークンを確認
    };

  const validate = (values:FormValues) => {
    const errors: FormErrors = {} as FormErrors;
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    const passwordRegex = /^[a-zA-Z0-9.?/-]{8,24}$/
  
    if (!values.mailAddress) {
      errors.mailAddress = "メールアドレスを入力してください。";
    } else if (!regex.test(values.mailAddress)) {
      errors.mailAddress = "正しいメールアドレスを入力してください";
    }
    if (!values.password) {
      errors.password = "パスワードを入力してください。";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "英数8文字以上で入力してください";
    }
    
    return errors;
  };
  
  const menuItems = [
    {label:'ログイン', link: '/Login'},
    {label:'会員登録', link: '/MemberRegistration'},
    {label:'マイページ', link: '/MyPage'},
  ];

  return (
      <div>
        <HaderBar content = {menuItems}/>
        <Hamburger/>
      <div className="w-9/12 mx-auto">
        <HeadingText text="ログイン" className="text-center my-10 text-3xl font-bold"/>
        <div>
          <div>
            <OrganismsInputForm
              label="ログインID(メールアドレス)"
              name ="mailAddress"
              value={formData.mailAddress}
              onChange={handleChange}
              type="text"
              className="border border-black mb-2"
            />
            <p className="mb-2 text-red-500">{formErrors.mailAddress}</p>
          </div>
          <div>
            <OrganismsInputForm
              label="パスワード"
              name ="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              className="border border-black mb-2"
            />
            <p className="mb-2 text-red-500">{formErrors.password}</p>
          </div>
          <div className="flex justify-end">
            <Button label="ログイン"
              onClick={handleLogin}
              className={`py-1 my-10 px-4 rounded ${Object.keys(formErrors).length > 0 ? 'bg-gray-400 text-gray-700' : 'bg-blue-500 text-white font-bold'}`}
              disabled={Object.keys(formErrors).length >0}/>
          </div>
          </div>
        </div>
      </div>
    );
  }

export default Login;