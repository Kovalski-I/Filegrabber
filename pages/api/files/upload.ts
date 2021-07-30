import nc from 'next-connect';
import multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import sqlite3  from 'sqlite3';
import { open } from 'sqlite';
import { session } from 'next-session';

import { getHashedFilename } from '../../../lib/hash';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>();
const upload = multer({ dest: 'public/uploads/' });

handler.use(session({ autoCommit: false }));
handler.use(upload.single('file'));

handler.post(async (req: any, res) => { 
    const { info, is_file, is_public } = req.body;
    const { user_id } = req.session;

    if (!user_id)
        res.status(500).json({ error: 'user is not logged in' });

    const db = await open({ filename: 'db.sqlite', driver: sqlite3.Database });
    const result = await db.run(
        'INSERT INTO files (info, is_file, is_public, user_id) VALUES (?, ?, ?, ?)', 
        info, is_file, is_public, user_id
    );

    if (!result.lastID) 
        res.status(500).json({ error: 'last id is undefined' });

    if (is_file) {
        // creating unigue filename to store file in server
        const new_filename = getHashedFilename(
            user_id, result.lastID?.toString(), path.extname(info)
        );

        fs.renameSync(req.file.path, path.resolve('/public/uploads', new_filename));
    }

    await req.session.commit();

    db.close();
    res.end();
});

export default handler;
