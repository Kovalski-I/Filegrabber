import { useCallback, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { extname } from 'path';

import GrabFileImage from './svg/grabfile';
import GrabCopyImage from './svg/grabcopy';
import { getHashedFilename } from '../lib/hash';
import { getRandomInt } from '../lib/random';

import type { FileCard } from '../types';

import styles from '../styles/Card.module.css';

interface Props {
    file: FileCard;
    flag: number;
    deleteItem: (i: number) => void;
}

const FileCardComponent = ({ file, flag, deleteItem }: Props) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const cardColor = useRef<string>();

    const colors = useMemo(() => ['#5488A6', '#54A67A', '#BA5252', '#9F54A6', '#D89648'], []);

    const getCardNode = useCallback(() => {
        const node = cardRef.current;
        if (!node) throw new Error('card node is null');

        return node;
    }, []);

    const grabFile = useCallback(async () => {
        const card = getCardNode();
        card.style.display = 'none';

        deleteItem(flag);

        const { file_id, is_file, user_id } = file;
        await axios.post('/api/files/delete', { file_id, is_file, user_id });
    }, [flag]);

    useEffect(() => {
        if (!cardColor.current)
            cardColor.current = colors[getRandomInt(colors.length)];

        const card = getCardNode();
        card.style.backgroundColor = cardColor.current;
    });

    return (
        <div ref={cardRef} className={styles.card}>
            <div className={styles.extension}>
                {file.is_file === 'true' ? extname(file.info) : 'Link'}
            </div>

            <div className={styles.filename}>
                {file.is_file === 'true' ? file.info : new URL(file.info).hostname}
            </div>

            <div className={styles.buttons}>
                <div className={styles.grabCopy} title="Grab copy">
                    <a 
                        href={file.is_file === 'true' ? 
                            `/uploads/${getHashedFilename(file.user_id, file.file_id.toString(), extname(file.info))}` : 
                            file.info}
                        download={file.is_file === 'true' ? file.info : undefined}
                        target={file.is_file === 'false' ? '_blank' : undefined}
                    >
                        <GrabCopyImage size={20} />
                    </a>
                </div>

                <div className={styles.grabFile} title="Grab file">
                    <a 
                        href={file.is_file === 'true' ? 
                            `/uploads/${getHashedFilename(file.user_id, file.file_id.toString(), extname(file.info))}` : 
                            file.info}
                        download={file.is_file === 'true' ? file.info : undefined}
                        onClick={grabFile}
                    >
                        <GrabFileImage size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default FileCardComponent;
