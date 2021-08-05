import nc from 'next-connect';
import multer from 'multer';
import * as path from 'path';
import sqlite3  from 'sqlite3';
import { open } from 'sqlite';
import { session } from 'next-session';

import { getHashedFilename, getHash } from '../../../lib/hash';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>({ 
    onNoMatch: (req, res) => res.status(400).json({ error: 'not found' }),
    onError: (error, req, res) => res.status(500).end()
});
const upload = multer({ 
    storage: multer.diskStorage({ 
        destination: './public/uploads',
        filename: async (req: any, file, cb) => {
            const { info, is_file, is_public } = req.body;
            console.log(info, is_file, is_public, __dirname);

            let { user_id } = req.body;
            if (!user_id) user_id = req.session.user_id;

            console.log(user_id);
            console.log('file:', req.file);

            const db = await open({ filename: 'db.sqlite', driver: sqlite3.Database });
            const result = await db.run(
                'INSERT INTO files (info, is_file, is_public, user_id) VALUES (?, ?, ?, ?)', 
                info, is_file, is_public, user_id
            );

            if (!result.lastID)
                cb(new Error('last id is undefined'), '');

            await req.session.commit();
            db.close();

            cb(null, getHashedFilename(user_id, result.lastID?.toString(), path.extname(info)));
        }
    })
});

handler.use(session({ autoCommit: false }));
handler.use(upload.single('file'));

handler.post(async (req, res) => {
    if (!req.body.user_id) res.redirect('/home').end();
    res.redirect(`/public/${getHash(req.body.user_id)}`).end();
});

export const config = {
    api: {
        bodyParser: false
    }
};

export default handler;
