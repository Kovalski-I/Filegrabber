import nc from 'next-connect';
import sqlite3  from 'sqlite3';
import { open } from 'sqlite';
import { session } from 'next-session';

import { validateToken } from '../../lib/validate_tokens';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiRequest } from '../../types';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(
    session({ autoCommit: false })
);

handler.get(async (req: ApiRequest, res) => {
    const { user_id, username } = req.session;

    if (!(user_id && username))
        res.status(500).json({ error: 'user is not logged in' });

    const db = await open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    });

    const rows = await db.all('SELECT * FROM files WHERE user_id = ?', user_id);

    await req.session.commit();
    db.close();

    res.json({ user_id, username, rows });
});

handler.post(async (req: ApiRequest, res) => {
    const { id_token, auth } = req.body;
    const [user_id, username] = await validateToken(auth, id_token);

    if (auth !== 'g' && auth !== 'f')
        res.status(500).json({ error: 'auth method is not valid' });

    req.session.user_id = [auth, user_id].join('-');
    req.session.username = username;

    await req.session.commit();
    
    res.end();
});

export default handler;
