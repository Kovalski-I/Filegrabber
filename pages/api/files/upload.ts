import nc from 'next-connect';
import multer from 'multer';
import * as path from 'path';

import { getHashedFilename, getHash } from '../../../lib/hash';
import { insertIntoFiles } from '../../../lib/db';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>({ 
    onNoMatch: (req, res) => res.status(400).json({ error: 'not found' }),
    onError: (error, req, res) => res.status(500).end()
});
const upload = multer({ 
    storage: multer.diskStorage({ 
        destination: './public/uploads',
        filename: async (req: any, file, cb) => {
            const { info, is_file, is_public, user_id } = req.body;

            const result = await insertIntoFiles({ info, is_file, is_public, user_id: user_id });

            if (!result || is_file !== 'true') 
                cb(new Error('result is undefined or the card is not a file'), '');

            cb(null, getHashedFilename(user_id, result?.toString(), path.extname(info)));
        }
    }),
    limits: {
        fileSize: 5_000_000,
    }
});

handler.post(upload.single('file'), async (req, res) => {
    const { info, is_file, is_public, user_id } = req.body;
    
    if (is_file === 'false')
        await insertIntoFiles({ info, is_file, is_public, user_id });

    if (is_public === 'false') res.redirect('/home').end();
    res.redirect(`/public/${getHash(user_id)}`).end();
});

export const config = {
    api: {
        bodyParser: false
    }
};

export default handler;
