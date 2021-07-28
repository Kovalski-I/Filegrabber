import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import { useEffect } from 'react';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const HomePage = () => {
    const router = useRouter();
    const { data, error } = useSWR('/api/users', fetcher);

    useEffect(() => {
        if (!data) {}
        else if (!(data.user_id && data.username)) router.push('/');
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
            <div>{data.user_id}</div>
            <div>{data.username}</div>
        </>
    );
}

export default HomePage;
