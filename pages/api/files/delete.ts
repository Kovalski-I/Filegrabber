import nc from 'next-connect';
import sqlite3  from 'sqlite3';
import * as path from 'path';
import * as fs from 'fs';
import { session } from 'next-session';
import { open } from 'sqlite';

import { getHashedFilename } from '../../../lib/hash';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>();
handler.use(session({ autoCommit: false }));

handler.post(async (req: any, res) => {
    const db = await open({ filename: 'db.sqlite', driver: sqlite3.Database });
    const { user_id } = req.session;
    const { file_id, is_file } = req.body;

    if (!user_id)
        res.status(500).json({ error: 'user is not logged in' });

    if (is_file) {
        const { info } = await db.get('SELECT info, is_file FROM files WHERE file_id = ?', file_id);
        const hashed_name = getHashedFilename(user_id, file_id, path.extname(info));

        fs.unlinkSync(path.resolve('/public/uploads', hashed_name));
    }

    await db.run('DELETE FROM files WHERE file_id = ?', file_id);

    await req.session.commit();

    db.close();
    res.end();
});

export default handler;
