import createHash from 'create-hash';

export const getHashedFilename = (user_id: string, file_id: string | undefined, ext: string) => {
    if (!file_id) throw new Error('file_id is undefined');

    const hash = createHash('sha224');
    hash.update([user_id, file_id].join('_'));

    const hashed_filename = hash.digest().toString();
    const new_filename = [hashed_filename, ext].join('.');

    return new_filename;
}