import React, { ChangeEvent, useRef} from "react";
import Button from "../Atoms/Button"; 
import Label from "../Atoms/Label";
import HeadingText from "../Atoms/HeadingText";
import Hamburger from "../Molecules/Hamburger";
import HaderBar from "../Molecules/HeaderBar";
import UserIcon from "../Atoms/UserIcon";
import OrganismsInputForm from "../Organisms/OrganismsLogin";
import { useDispatch, useSelector } from "react-redux";
import { selectFormErrors, selectFormData, setFormData, setFormErrors, selectIconImage, setUserIconImage, selectTouched, setTouched, selectImageError, setImageError } from "../../redux/formSlice";
import Unknown_person from "../../imgIcon/Unknown_person.jpg"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { login } from "../../redux/CertificationSlice";

interface FormValues {
  mailAddress: string;
  password: string;
  confirmPassword: string;
  nickName: string;
  userIconImage:string;
};

interface FormErrors {
  mailAddress: string;
  password: string;
  confirmPassword: string;
  nickName: string;
};

const MemberRegistration = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const formErrors = useSelector(selectFormErrors);
  const userIconImageSrc = useSelector(selectIconImage);
  const touched: { [key: string]: boolean } = useSelector(selectTouched);
  const imageError = useSelector(selectImageError);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // フォームデータを更新
    dispatch(setFormData({
      ...formData,
      [name]: value,
    }));
  
     // フィールドがフォーカスされているかチェック
    const isFieldTouched = touched[name];
  
    // フィールドがフォーカスされている場合はバリデーションを実行
    if (isFieldTouched) {
      const updatedFormData = {
        ...formData,
        [name]: value,
      };
      const errors = validate(updatedFormData);
      dispatch(setFormErrors(errors));
    }
  };

  const handleLogin = () => {
    //バリデーション実行
    const errors = validate(formData);
    dispatch(setFormErrors(errors));
    // フォームが有効かどうかをチェック
    const isFormValid = Object.keys(errors).length === 0;
    // 画像が選択されているかどうかをチェック
    const isImageSelected = userIconImageSrc !== Unknown_person;

  // バリデーションエラーがある場合は遷移を防止
  if (!isFormValid || !isImageSelected) {
    // 画像が選択されていない場合のエラーメッセージを設定
    if (!isImageSelected) {
      dispatch(setImageError('画像が選択されていません。'));
    }
    // フォームのタッチ状態をすべてtrueに設定
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    dispatch(setTouched(allTouched));
    // 遷移を防止
    return;
  };
    
    //エラーがなければログイン実行
    if (Object.keys(errors).length === 0 && !imageError){
    //data:image\/jpeg;base64,の部分切り取り
    const imageDataWithoutScheme = userIconImageSrc.replace(/^data:image\/jpeg;base64,/, '');
    // formDataに画像データを追加
    const formDataWithImage = {
      ...formData,
      userIconImage: imageDataWithoutScheme,
    };
  
      // ここでaxiosを使用してリクエストを送信
    axios.post('/user', formDataWithImage)
    .then(response => {
      // リクエストが成功した場合の処理
      console.log('会員登録が完了しました。');
    })
    .catch(error => {
      // リクエストが失敗した場合の処理
      console.error('会員登録に失敗しました。エラーメッセージ:', error.message);
      navigate('/');
    });
    };
    navigate('/MyPage');
    dispatch(login());
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    //<input type="file" />のプロパティ
    const file = e.target.files?.[0];
    if (file) {
      //最後がjpgで終わっているか
      if (!file.name.endsWith('.jpg')) {
        dispatch(setImageError('選択されたファイルはjpg形式ではありません。'));
        dispatch(setUserIconImage(Unknown_person));
        return;
      };
      //FileReader は、WebブラウザのJavaScript環境でファイルの内容を非同期で読み取るためのAPI
      const reader = new FileReader();
      //onloadend: 読み込み処理が完了したときに発生するイベントハンドラ
      reader.onloadend = () => {

        //reader.resultファイルの内容にアクセス
        let imageData = reader.result as string;
        
        // ここで取得した画像データを更新
        dispatch(setUserIconImage(imageData));
        dispatch(setImageError(''));  // 画像が正しければエラーをクリア
      };
      //ファイルの内容をBase64でエンコードし,画像ファイルなどのバイナリデータを文字列として取得できる
      reader.readAsDataURL(file);
    };
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      //current、実際のDOM要素への参照を格納。
      fileInputRef.current.click();
    }
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
    if (!values.confirmPassword) {
      errors.confirmPassword ="パスワードを入力してください"
    } else if (values.confirmPassword !== values.password || values.confirmPassword.length<8) {
      errors.confirmPassword = "パスワードと一致しません。";
    }
    if (!values.nickName) {
      errors.nickName ="ニックネームを入力してください"
    } else if (values.nickName.length < 8) {
        errors.nickName = "8文字以上で入力してください";
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
      <HeadingText text="会員登録" className="text-center my-8 text-3xl font-bold"/>
      <div className="w-9/12 mx-auto">
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
            label="パスワード(英数８字以上)"
            name ="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="border border-black mb-2"
          />
          <p className="mb-2 text-red-500">{formErrors.password}</p>
        </div>
        <div>
          <OrganismsInputForm
            label="パスワード確認"
            name ="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            className="border border-black mb-2"
          />
          <p className="mb-2 text-red-500">{formErrors.confirmPassword}</p>
        </div>
        <div>
          <OrganismsInputForm
            label="ニックネーム"
            name ="nickName"
            value={formData.nickName}
            onChange={handleChange}
            type="text"
            className="border border-black mb-2"
          />
          <p className="mb-2 text-red-500">{formErrors.nickName}</p>
        </div>
        <div className="flex flex-col">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            ref={fileInputRef}
          />
          <Label
            label="ユーザーアイコン画像"
            className=""
          />
          <UserIcon
            src={userIconImageSrc}
            className=" h-16 my-1 mx-auto rounded-full cursor-pointer"
            onClick={handleIconClick}
          />
          <p className="mb-2 text-red-500">{imageError}</p>
          <Label label="タップして画像を変更" className="text-center cursor-pointer" onClick={handleIconClick}/>
        </div>  
        <div className="flex justify-end mx-auto">
          <Button
            label="登録する"
            onClick={handleLogin}
            className={`py-1 my-10 px-4 rounded ${Object.keys(formErrors).length > 0 || imageError ? 'bg-gray-400 text-gray-700' : 'bg-blue-500 text-white font-bold'}`}
            disabled={
            Object.keys(formErrors).length > 0}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberRegistration;

