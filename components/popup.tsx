import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import CloseButton from '../components/svg/close';
import LoginButton from '../components/loginbutton';

import { FACEBOOK_APP_ID, GOOGLE_API_CLIENT_ID } from '../secrets';

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

            { /* Handle possible errors when testing */ }            
            <GoogleLogin
                clientId={GOOGLE_API_CLIENT_ID}
                render={renderProps => (
                    <LoginButton 
                        onClick={renderProps.onClick} caption="Log in with Google" 
                    />
                )}
                onSuccess={response => console.log(response)}
                onFailure={() => alert('Failure while trying to log you in')}
                cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
                appId={FACEBOOK_APP_ID}
                fields="name,picture" 
                render={(renderProps: { onClick: () => void; }) => (
                    <LoginButton onClick={renderProps.onClick} caption="Log in with Facebook" />
                )}
                callback={(response: unknown) => console.log(response)}
            />
        </div> 
    </div>
);

export default LoginPopup;
