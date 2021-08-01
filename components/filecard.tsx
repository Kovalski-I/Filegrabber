import { useCallback, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { extname } from 'path';

import GrabFileImage from './svg/grabfile';
import GrabCopyImage from './svg/grabcopy';
import { getHashedFilename } from '../lib/hash';
import { getRandomInt } from '../lib/random';

import type { FileCard } from '../types';

import styles from '../styles/Card.module.css';

const FileCardComponent = ({ file }: { file: FileCard }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const colors = useMemo(() => ['#5488A6', '#54A67A', '#BA5252', '#9F54A6', '#D89648'], []);

    const grabFile = useCallback(() => {
        const { file_id, is_file } = file;
        axios.post('api/files/delete', { file_id, is_file });
    }, []);

    useEffect(() => {
        const color = colors[getRandomInt(colors.length)];
        if (!cardRef.current) {}
        else cardRef.current.style.backgroundColor = color;
    }, []);

    return (
        <div ref={cardRef} className={styles.card}>
            <div className={styles.extension}>
                {file.is_file ? extname(file.info) : 'Link'}
            </div>

            <div className={styles.filename}>
                {file.is_file ? file.info : new URL(file.info).hostname}
            </div>

            <div className={styles.buttons}>
                <div className={styles.grabCopy} title="Grab copy">
                    <a 
                        href={file.is_file ? 
                            `/uploads/${getHashedFilename(file.user_id, file.file_id.toString(), extname(file.info))}` : 
                            file.info}
                        download={file.is_file ? file.info : undefined}
                        target={!file.is_file ? '_blank' : undefined}
                    >
                        <GrabCopyImage size={20} />
                    </a>
                </div>

                <div className={styles.grabFile} title="Grab file">
                    <a 
                        href={file.is_file ? 
                            `/uploads/${getHashedFilename(file.user_id, file.file_id.toString(), extname(file.info))}` : 
                            file.info}
                        download={file.is_file ? file.info : undefined}
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
