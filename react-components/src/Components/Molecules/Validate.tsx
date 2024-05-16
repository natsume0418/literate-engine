interface FormValues {
    mailAddress: string;
    password: string;
  };
  
  interface FormErrors {
    mailAddress: string;
    password: string;
  };
  
  const Validate = (values: FormValues): FormErrors => {
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
      errors.password = "英数8文字以上のパスワードを入力してください";
    }
    
    return errors;
  };
  
  export default Validate;
  