import nc from 'next-connect';
import { session } from 'next-session';

import { validateToken } from '../../lib/validate_tokens';
import { generateCoookie } from '../../lib/cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

interface ApiRequest {
    body: {
        id_token: string;
        auth: AuthType;
    }
    session: {
        user_id: string;
        username: string;
        commit: () => Promise<void>;
    }
}

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(
    session({ autoCommit: false })
);

handler.get(async (req: ApiRequest, res) => {
    const { user_id, username } = req.session;

    await req.session.commit();
    if (!(user_id && username))
        res.json({ user_id: null, username: null });
    else 
        res.json({ user_id, username });
});

handler.post(async (req: ApiRequest, res) => {
    const { id_token, auth } = req.body;
    const [user_id, username] = await validateToken(auth, id_token);

    req.session.user_id = [auth, user_id].join('-');
    req.session.username = username;

    await req.session.commit();
    
    // res.setHeader('Set-Cookie', `name=${username}`);
    res.end();
});

export default handler;
