import sqlite3  from 'sqlite3';
import { open } from 'sqlite';

import type { FileCard, InsertIntoFilesParams, User } from '../types';

export const insertIntoFiles = async ({ info, is_file, is_public, user_id }: InsertIntoFilesParams) => {
    const db = await getDB();
    const result = await db.run(
        'INSERT INTO files (info, is_file, is_public, user_id) VALUES (?, ?, ?, ?)', 
        info, is_file, is_public, user_id
    );

    db.close();

    return result.lastID;
}

export const getFiles = async (user_id: string) => {
    const db = await getDB();
    const files = await db.all<FileCard[]>('SELECT * FROM files WHERE user_id = ?', user_id);

    db.close();

    return files;
}

export const getUserByHash = async (hash: string) => {
    const db = await getDB();
    const user = await db.get<User>('SELECT * FROM users WHERE user_hash = ?', hash);

    db.close();

    return user;
}

export const getDB = async () => await open({ filename: 'db.sqlite', driver: sqlite3.Database });
