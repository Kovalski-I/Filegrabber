import Image from 'next/image';
import { useMemo, useRef } from 'react';

import FileCardComponent from '../components/filecard';
import PublicPageImage from './svg/publicpage';
import UploadImage from './svg/uploadimage';
import UploadLinkImage from './svg/uploadlink';
import QuitImage from './svg/quitimage';
import { getHash } from '../lib/hash';

import styles from '../styles/App.module.css';

import type { FileCard } from '../types';

interface AppPageProps {
    isPublic: boolean;
    username: string;
    user_id: string;
    files: FileCard[];
}

const AppPage = ({ isPublic, username, files, user_id }: AppPageProps) => {
    const size = useMemo(() => 30, []);
    const fileCards = useRef(files.filter(file => !!file.is_public === isPublic));

    return (
        <div className={styles.app}>
            <div className={styles.buttons}>
                {!isPublic && 
                    <a href={`public/${getHash(user_id)}`} target="_blank">
                        <PublicPageImage size={size} />
                    </a>}
                <UploadImage size={size} />
                <UploadLinkImage size={size} />
                {!isPublic && <QuitImage size={size} />}
            </div>

            <div className={styles.content}>
                <div className={styles.username}>
                    {isPublic ? [username, 'Public'].join(' / ') : username}
                </div>

                <div className={fileCards.current.length === 0 ? styles.dropImage : styles.cardsField}>
                    {fileCards.current.length === 0 ? 
                        <Image src="/svg/box.svg" width={415} height={150} /> : 
                        fileCards.current.map(fileCard => <FileCardComponent file={fileCard} />)}
                </div>
            </div>
        </div>
    );
}

export default AppPage;
