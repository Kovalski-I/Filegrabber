import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import useSWR from 'swr';
import { useEffect } from 'react';

import AppPage from '../components/app_page';
import Footer from '../components/footer';

import type { FileCard } from '../types';

interface Data {
    user_id: string;
    username: string;
    rows: FileCard[];
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const HomePage = () => {
    const router = useRouter();
    const { data, error } = useSWR<Data, Error>('/api/users', fetcher);

    useEffect(() => {
        if (!data) {}
        else if (!(data.user_id && data.username) || error) router.push('/');
        else document.cookie = `username=${data.username}`;
    }, [data]);

    if (!data) 
        // loading
        return null;
    else if (!(data.user_id && data.username) || error)
        // no data recieved
        return null; 

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <AppPage isPublic={false} username={data.username} files={data.rows} />
            <Footer inMain />
        </>
    );
}

export default HomePage;
