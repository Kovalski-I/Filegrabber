import nc from 'next-connect';

import { validateToken } from '../../lib/validate_tokens';
import { getHash } from '../../lib/hash';
import { generateCoookie } from '../../lib/cookie';
import { getDB } from '../../lib/db';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiRequest } from '../../types';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req: ApiRequest, res) => {
    const { id_token, auth } = req.body;
    const [user_id, username] = await validateToken(auth, id_token);

    if (auth !== 'g' && auth !== 'f')
        res.status(500).json({ error: 'auth method is not valid' });

    const db_user_id = [auth, user_id].join('-');
    const user_hash = getHash(db_user_id);

    const db = await getDB();
    await db.run('INSERT OR REPLACE INTO users VALUES (?, ?, ?)', db_user_id, user_hash, username);

    db.close();
    
    res.setHeader('Set-Cookie', generateCoookie('user_hash', user_hash, 30));
    res.end();
});

export default handler;
