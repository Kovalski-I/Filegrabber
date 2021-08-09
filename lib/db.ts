import sqlite3  from 'sqlite3';
import { open } from 'sqlite';

import type { InsertIntoFilesParams } from '../types';

export const insertIntoFiles = async ({ info, is_file, is_public, user_id }: InsertIntoFilesParams) => {
    const db = await open({ filename: 'db.sqlite', driver: sqlite3.Database });
    const result = await db.run(
        'INSERT INTO files (info, is_file, is_public, user_id) VALUES (?, ?, ?, ?)', 
        info, is_file, is_public, user_id
    );

    db.close();

    return result.lastID;
}
