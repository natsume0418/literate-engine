
//TOPPageの文言とボタン
import Text from "../Atoms/Text";
import HeadingText from "../Atoms/HeadingText";
import Button from "../Atoms/Button";
import '../../input.css';
import UserIcon from "../Atoms/UserIcon";
import page from "../../imgIcon/page.jpg"

interface TOPPageProps {
    onLogin: () => void;
    onRegistration: () => void;
    isLoggedIn: boolean;
};


const TOPPage = ({
    onLogin,
    onRegistration,
    isLoggedIn,
    }:TOPPageProps) => {


    return(
        <div className="flex flex-col w-9/12 mx-auto mt-36 items-center">
            <div className="text-center">
                <HeadingText text="ブログサービス課題" className="text-3xl font-bold mb-4"/>
                <Text content="React.jsを利用したブログサービス課題です" className=""/>
                <div className="sm:flex-row">
                    {!isLoggedIn && <Button label="ログイン" onClick={onLogin} className="bg-blue-500 text-white font-bold py-1 my-1 px-4 rounded mx-2 w-40"/>}
                    {!isLoggedIn && <Button label="会員登録" onClick={onRegistration} className="bg-blue-500 text-white font-bold py-1 my-1 px-4 rounded mx-2 w-40"/>}
                </div>
                <UserIcon src={page} className="h-50 mt-5 hidden sm:block"/>
            </div>
        </div>
    );
};

export default TOPPage;
