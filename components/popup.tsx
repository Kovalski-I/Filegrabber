import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import CloseButton from '../components/svg/close';
import LoginButton from '../components/loginbutton';

import styles from '../styles/Popup.module.css';

interface Props {
    visible: boolean;
    close: () => void;
}

const LoginPopup = ({ visible, close }: Props) => (
    <div className={visible ? styles.wrapper : undefined}>
        <div className={visible ? styles.popupVisible : styles.popupUnvisible}>
            <div className={styles.captionBox}>
                <span>Logging in into Filegraber</span>
            </div>
            <CloseButton size={30} closePopup={close} />

            { /* TODO: change callbacks when doing backend */ }            
            <GoogleLogin
                clientId="213876207663-5rpd5dn5f512t1u6diundppq0pe7s2i4.apps.googleusercontent.com"
                render={() => <LoginButton caption="Log in with Google" />}
                onSuccess={() => {}}
                onFailure={() => {}}
                cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
                appId="903471543899702"
                autoLoad={false}
                fields="name,email,picture" 
                render={() => <LoginButton caption="Log in with Facebook" />}
                callback={() => {}}
            />
        </div> 
    </div>
);

export default LoginPopup;
