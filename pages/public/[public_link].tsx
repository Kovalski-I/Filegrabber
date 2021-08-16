import Head from 'next/head';
import sqlite3  from 'sqlite3';
import { open } from 'sqlite';

import AppPage from '../../components/app_page';
import Footer from '../../components/footer';
import { getDB } from '../../lib/db';

import type { FileCard } from '../../types';

const PublicPage = ({ files, user_id, username }: { files: FileCard[], user_id: string, username: string }) => {
    return (
        <>
            <Head>
                <title>{`${username}'s Public Page`}</title>
            </Head>

            <AppPage isPublic username={username} user_id={user_id} files={files} />
            <Footer inMain />
        </>
    );
}

export const getServerSideProps = async ({ params }: { params: { public_link: string } }) => {
    const db = await getDB();
    const { user_id, username } = await db.get(
        'SELECT user_id, username FROM users WHERE user_hash = ?', 
        params.public_link
    );

    const files = await db.all('SELECT * FROM files WHERE user_id = ?', user_id);

    return {
        props: { files, user_id, username }
    };
}

export default PublicPage;
