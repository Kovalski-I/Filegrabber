import nc from 'next-connect';
import sqlite3  from 'sqlite3';
import * as path from 'path';
import * as fs from 'fs';
import { open } from 'sqlite';

import { getHashedFilename } from '../../../lib/hash';
import { getDB } from '../../../lib/db';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (err, req, res) => res.status(500).end()
});

handler.post(async (req: any, res) => {
    const db = await getDB();

    const { file_id, is_file, user_id } = req.body;

    if (!user_id)
        res.status(500).json({ error: 'user is not logged in' });

    if (is_file === 'true') {
        const { info } = await db.get('SELECT info FROM files WHERE file_id = ?', file_id);
        const hashed_name = getHashedFilename(user_id, file_id, path.extname(info));

        try {
            console.log(__dirname);
            if (process.env.NODE_ENV === 'development')
                fs.unlinkSync(path.join(__dirname,  '../../../../../public/uploads', hashed_name));
            else 
                fs.unlinkSync(path.join(__dirname, '../../../../public/uploads', hashed_name));

        } catch {
            console.log('caught');
            // file was not found in the fs, just deleting the record
        }
    }

    await db.run('DELETE FROM files WHERE file_id = ?', file_id);

    db.close();
    res.end();
});

export default handler;
