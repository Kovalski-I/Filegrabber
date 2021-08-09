import nc from 'next-connect';
import { session } from 'next-session';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>();
handler.use(session({ autoCommit: false }));

handler.post(async (req, res) => {
    await (req as any).session.destroy();
    res.end();
});

export default handler;
