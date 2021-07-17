import Head from 'next/head';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import { useCallback, useState } from 'react';

import LoginPopup from '../components/popup';

import styles from '../styles/pages/Main.module.css';

import type { GetServerSideProps } from 'next';

interface Props {
    username?: string
}

const MainPage = ({ username }: Props) => {
    const [popupShown, setPopupShown] = useState(false);
    const closePopup = useCallback(() => {
        setPopupShown(false);
    }, []);

    return (
        <>
            <Head>
                <title>Filegraber</title>
                <meta 
                    name="google-signin-client_id" 
                    content="213876207663-5rpd5dn5f512t1u6diundppq0pe7s2i4.apps.googleusercontent.com" 
                />
            </Head>

            <div className={styles.head}>
                <div className={styles.logo}>
                    <Image src="/svg/logo_white.svg" width={100} height={100} />
                    <span className={styles.logoCaption}>Filegraber</span>
                </div>
                
                <div className={styles.login}>
                    { username ? 
                        <span className={styles.loggedIn}>
                            { /* TODO: change <a> tag to Link component when doing backend */ }
                            Logged in as <a className={styles.loginLink} href="">{`@${username}`}</a>
                        </span> : 
                        <Button size="lg" variant="success" onClick={() => setPopupShown(true)}>Log In</Button> }
                </div>
            </div>

            <LoginPopup visible={popupShown} close={closePopup} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    // TODO: define it so it returns the username
    return {
        props: {}
    };
}

export default MainPage;
