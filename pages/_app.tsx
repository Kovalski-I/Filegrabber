import Footer from '../components/footer';
import Head from 'next/head';

import '../styles/global.css';

import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />

            { /* Google Fonts */ }
            <link rel="preconnect" href="https://fonts.googleapis.com" key="fonts" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" key="fonts" />
            <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" 
                rel="stylesheet" key="fonts" 
            />
            <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap" 
                rel="stylesheet" key="source_sans" 
            />

            { /* React Bootstrap */ }
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
                crossOrigin="anonymous"
                key="bootstrap"
            />
        </Head>

        <Component {...pageProps} />
        <Footer />
    </>
);

export default App;
