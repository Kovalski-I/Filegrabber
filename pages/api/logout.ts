import nc from 'next-connect';
import { session } from 'next-session';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>();
handler.use(session({ autoCommit: false }));

handler.post(async (req: any, res) => {
    await req.session.destroy();
    res.end();
});
