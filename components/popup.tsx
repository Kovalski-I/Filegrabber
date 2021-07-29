import { useCallback } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useRouter } from 'next/router';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import CloseButton from '../components/svg/close';
import LoginButton from '../components/loginbutton';
import { generateCoookie, deleteCookie } from '../lib/cookie';

import { FACEBOOK_APP_ID, GOOGLE_API_CLIENT_ID } from '../secrets';

import type { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import type { ReactFacebookLoginInfo } from 'react-facebook-login';

import styles from '../styles/Popup.module.css';

interface Props {
    visible: boolean;
    close: () => void;
}

const LoginPopup = ({ visible, close }: Props) => {
    const router = useRouter();

    const handleGoogleLogin = useCallback(async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('code' in response) return;

        const { id_token } = response.getAuthResponse();
        await axios.post('/api/users', { id_token, auth: 'g' });

        router.push('/home');
    }, []);

    const handleFacebookLogin = useCallback(async (response: ReactFacebookLoginInfo) => {
        const { accessToken } = response;
        if (!accessToken) return;

        await axios.post('/api/users', { id_token: accessToken, auth: 'f' });
        
        router.push('/home');
    }, []);

    return (
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
                    onSuccess={response => handleGoogleLogin(response)}
                    onFailure={() => alert('Failure while trying to log you in')}
                    cookiePolicy={'single_host_origin'}
                />
                <FacebookLogin
                    appId={FACEBOOK_APP_ID}
                    fields="name" 
                    render={(renderProps: { onClick: () => void; }) => (
                        <LoginButton onClick={renderProps.onClick} caption="Log in with Facebook" />
                    )}
                    callback={(response: ReactFacebookLoginInfo) => handleFacebookLogin(response)}
                />
            </div> 
        </div>
    );
}

export default LoginPopup;
