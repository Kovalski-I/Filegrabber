import nc from 'next-connect';
import multer from 'multer';
import * as path from 'path';
import { session } from 'next-session';

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
            const { info, is_file, is_public } = req.body;

            let { user_id } = req.body;
            if (!user_id) user_id = req.session.user_id;

            const result = await insertIntoFiles({ info, is_file, is_public, user_id });

            if (!result || is_file !== 'true') {
                console.log('niggas sukc');
                cb(new Error('result is undefined or the card is not a file'), '');
                console.log('fuck your ass nigga');
            }

            await req.session.commit();

            console.log('before');
            cb(null, getHashedFilename(user_id, result?.toString(), path.extname(info)));
            console.log('after');
        }
    })
});

handler.use(session({ autoCommit: false }));
handler.use(upload.single('file'));

handler.post(async (req, res, next) => {
    const { info, is_file, is_public, user_id } = req.body;
    
    if (is_file === 'false')
        await insertIntoFiles({ 
            info, is_file, is_public, user_id: user_id ? user_id : (req as any).session.user_id 
        });

    if (!user_id) res.redirect('/home').end();
    res.redirect(`/public/${getHash(user_id)}`).end();
});

export const config = {
    api: {
        bodyParser: false
    }
};

export default handler;
