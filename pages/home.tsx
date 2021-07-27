import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import { useEffect } from 'react';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const HomePage = () => {
    const router = useRouter();
    const { data, error } = useSWR('/api/users', fetcher);

    useEffect(() => {
        if (!data) return;
        else if (!(data.user_id && data.username)) router.push('/');
    }, [data]);

    if (!data) 
        // loading
        return null;
    else if (!(data.user_id && data.username) || error)
        // no data recieved
        return <div>Redirecting...</div>; 

    return (
        <>
            <div>{data.user_id}</div>
            <div>{data.username}</div>
        </>
    );
}

export default HomePage;
