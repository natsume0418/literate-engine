import React, { ChangeEvent, useEffect, useRef } from "react";
import Button from "../Atoms/Button"; 
import Input from "../Atoms/Input";
import Label from "../Atoms/Label";
import HeadingText from "../Atoms/HeadingText";
import Hamburger from "../Molecules/Hamburger";
import HaderBar from "../Molecules/HeaderBar";
import UserIcon from "../Atoms/UserIcon";
import Unknown_person from "../../imgIcon/Unknown_person.jpg"
import { fetchUserData } from "../../redux/userSlice";
import {  useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { selectFormData, selectFormErrors, selectIconImage, selectImageError, selectTouched, setFormData, setFormErrors, setImageError, setTouched, setUserIconImage } from "../../redux/formSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormValues {
  mailAddress: string;
  nickName: string;
  userIconImage:string;
};

interface FormErrors {
  mailAddress: string;
  nickName: string;
};

const MemberRegistration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector(selectFormData);
  const formErrors = useSelector(selectFormErrors);
  const userIconImageSrc = useSelector(selectIconImage);
  const touched: { [key: string]: boolean } = useSelector(selectTouched);
  const imageError = useSelector(selectImageError);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const saveChanges = async () => {
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
  }
    
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
    axios.put('/user', formDataWithImage)
    .then(response => {
      // リクエストが成功した場合の処理
      console.log('会員登録が完了しました。');
      navigate('/MyPage');
    })
    .catch(error => {
      // リクエストが失敗した場合の処理
      console.error('会員登録に失敗しました。エラーメッセージ:', error.message);
      navigate('/');
    });
    };
  };

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.name.endsWith('.jpg')) {
        dispatch(setImageError('選択されたファイルはjpg形式ではありません。'));
        dispatch(setUserIconImage(Unknown_person));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        // 画像データをbase64形式に変換
        const base64 = reader.result as string;
        // Reduxの状態を更新
        dispatch(setUserIconImage(base64));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = (values:FormValues) => {
    const errors: FormErrors = {} as FormErrors;
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  
    if (!values.mailAddress) {
      errors.mailAddress = "メールアドレスを入力してください。";
    } else if (!regex.test(values.mailAddress)) {
      errors.mailAddress = "正しいメールアドレスを入力してください";
    }
    if (!values.nickName) {
      errors.nickName ="ニックネームを入力してください"
    } else if (values.nickName.length < 8) {
        errors.nickName = "8文字以上で入力してください";
    }
    
    return errors;
  };
  
  const menuItems = [
    {label:'新規投稿画面', link: '/ArticleSubmit'},
    {label:'投稿一覧画面', link: '/ArticleList'},
    {label:'マイページ', link: '/MyPage'},
  ];

  const handleIconClick = () => {
    if (fileInputRef.current) {
      //current、実際のDOM要素への参照を格納。
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <HaderBar content = {menuItems}/>
      <Hamburger/>
      <HeadingText text="会員情報変更" className="text-center my-10 text-3xl font-bold"/>
        <div>
          <div className="flex flex-col mb-3">
            <Label label="ニックネーム" className="mx-auto w-9/12"/>
            <Input name="nickName" value={formData.nickName} onChange={handleChange} type="text" maxLength={20} className="border border-black w-9/12 mx-auto" />
            {formErrors.nickName && <p className="text-red-500 mx-auto w-9/12">{formErrors.nickName}</p>}
          </div>
          <div className="flex flex-col">
          <div className="flex flex-col mb-3">
            <Label label="ログインID(メールアドレス)" className="w-9/12 mx-auto" />
            <Input name="mailAddress" value={formData.mailAddress} onChange={handleChange} type="text" maxLength={20} className="border border-black w-9/12 mx-auto"/>
            {formErrors.mailAddress && <p className="text-red-500 mx-auto w-9/12">{formErrors.mailAddress}</p>}
          </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
            />
            <Label label="ユーザーアイコン画像" className="mx-auto w-9/12"/>
            <UserIcon
              src={userIconImageSrc !== null ? userIconImageSrc : Unknown_person}
              className="h-16 my-1 mx-auto rounded-full cursor-pointer"
              onClick={handleIconClick}
            />
            <p className="mb-2 text-red-500 mx-auto w-9/12">{imageError}</p>
            <Label label="タップして画像を変更" className="mx-auto w-9/12 text-center"/>
          </div>
          <div className="flex justify-end w-9/12 mx-auto">
            <Button label="変更する" onClick={saveChanges} className="bg-blue-500 text-white font-bold py-1 my-10 px-4 rounded" />
          </div>
        </div>
    </div>
    );
  };

export default MemberRegistration;