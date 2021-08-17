import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';

import AppPage from '../components/app_page';
import Footer from '../components/footer';

import { getFiles, getUserByHash } from '../lib/db';

import type { NextApiRequest } from 'next';
import type { User, FileCard } from '../types';

type Data = User & { rows: FileCard[] };

const HomePage = ({ data }: { data: Data }) => {
    const router = useRouter();

    useEffect(() => {
        if (!data) {}
        else if (!(data.user_id && data.username)) router.push('/');
    }, [data, router]);

    if (!data) 
        // loading
        return null;
    else if (!(data.user_id && data.username))
        // no data recieved
        return null; 

    return (
        <>
            <Head>
                <title>Home - Filegraber</title>
                <meta name="description" content="Main application page of Filegraber" />
            </Head>

            <AppPage isPublic={false} username={data.username} user_id={data.user_id} files={data.rows} />
            <Footer inMain />
        </>
    );
}


type HomeServerSideFunction = ({ req }: { req: NextApiRequest }) => 
    Promise<{ props: { data: {} } } | { props: { data: User } }>;

export const getServerSideProps: HomeServerSideFunction = async ({ req }) => {
    const user = await getUserByHash(req.cookies.user_hash);
    if (!user) return { props: { data: {} } };

    const files = await getFiles(user.user_id);
    const data: Data = Object.assign(user, { rows: files });

    return { props: { data } };
}

export default HomePage;
