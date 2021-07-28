import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import { useCallback, useEffect, useState } from 'react';

import { validateToken } from '../lib/validate_tokens';
import LoginPopup from '../components/popup';
import Footer from '../components/footer';
import Info from '../components/info';

import InterfaceImage from '../components/svg/interface';
import DownloadImage from '../components/svg/download';
import LaptopImage from '../components/svg/laptop';

import { GOOGLE_API_CLIENT_ID } from '../secrets';

import styles from '../styles/pages/Main.module.css';
import utils from '../styles/Utils.module.css';

import type { GetServerSideProps } from 'next';

interface Props {
    username?: string;
}

const MainPage = ({ username }: Props) => {
    const [popupShown, setPopupShown] = useState(false);
    const closePopup = useCallback(() => setPopupShown(false), []);

    useEffect(() => {
        const blackDesc = document.querySelector('.blackDescription');
        if (!blackDesc) return;

        document.addEventListener('scroll', () => {
            if (window.scrollY > 150) blackDesc.className = styles.blackDescriptionAnim;
        });
    }, []);

    return (
        <>
            <Head>
                <title>Filegraber</title>
                <meta 
                    name="google-signin-client_id" 
                    content={GOOGLE_API_CLIENT_ID} 
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
                            Logged in as {' '} 
                            <Link href="/home">
                                <a className={styles.loginLink}>{username}</a>
                            </Link>
                        </span> : 
                        <Button size="lg" variant="success" onClick={() => setPopupShown(true)}>Log In</Button> }
                </div>
            </div>

            <main>
                <Info left={() => (
                    <article>
                        <h2 className={utils.title}>Easily sync files between your devices</h2>
                        <div className={utils.description}>
                            Filegraber is free tool for sharing files and hyperlinks between your devices. 
                            Just drop the file from one device and grab it from another. Everything is simple 
                            as it should be.
                        </div>
                    </article>
                )} right={() => (
                    <InterfaceImage size={325} />
                )} />

                <div className={utils.rectangle}>
                    <Info left={() => (
                        <span id="downloadImage">
                            <DownloadImage size={300} />
                        </span>
                    )} right={() => (
                        <article>
                            <span className="blackDescription">
                                <h2 className={utils.title}>Share your files with others</h2>
                                <div className={utils.description}>
                                    Filegraber can expose files to the page accessed via the public link.  
                                    Everyone can also send you files using your public page anonymously and 
                                    without registration.
                                </div>
                            </span>
                        </article>
                    )} reverse />
                </div>

                <Info left={() => (
                    <article>
                        <h2 className={utils.title}>No registration needed</h2>
                        <div className={utils.description}>
                            You can start using Filegraber now if you have Google or Facebook account.
                        </div>
                        { username ? 
                            <span className={styles.loggedInWhite}>
                                You're already logged in, {' '} 
                                <Link href="/home">
                                    <a className={styles.loginLinkWhite}>{username}</a>
                                </Link>
                            </span> : 
                            <Button size="lg" variant="success" onClick={() => setPopupShown(true)}>
                                Log In
                            </Button> }
                    </article>
                )} right={() => (
                    <LaptopImage size={275} />
                )} />
            </main>

            <LoginPopup visible={popupShown} close={closePopup} />

            <Footer />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const { username } = req.cookies;

    if (!username) return { props: { username: null } };
    else return { props: { username } };
}

export default MainPage;
