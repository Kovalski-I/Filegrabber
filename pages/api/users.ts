import * as path from 'path';
import nc from 'next-connect';
import sqlite3  from 'sqlite3';
import { open } from 'sqlite';
import { session } from 'next-session';

import * as fs from 'fs';

import { validateToken } from '../../lib/validate_tokens';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { File } from '../../types';

interface ApiRequest {
    body: {
        id_token: string;
        auth: 'g' | 'f';
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
    const db = await open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    });

    const rows = await db.all('SELECT * FROM files WHERE user_id = ?', user_id);

    await req.session.commit();
    if (!(user_id && username))
        res.json({ user_id: null, username: null, rows: null });
    else 
        res.json({ user_id, username, rows });
});

handler.post(async (req: ApiRequest, res) => {
    const { id_token, auth } = req.body;
    const [user_id, username] = await validateToken(auth, id_token);

    req.session.user_id = [auth, user_id].join('-');
    req.session.username = username;

    await req.session.commit();
    
    res.end();
});

export default handler;
