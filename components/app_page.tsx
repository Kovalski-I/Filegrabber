import Image from 'next/image';
import { useMemo } from 'react';

import FileCardComponent from '../components/filecard';
import PublicPageImage from './svg/publicpage';
import UploadImage from './svg/uploadimage';
import UploadLinkImage from './svg/uploadlink';
import QuitImage from './svg/quitimage';

import styles from '../styles/App.module.css';

import type { FileCard } from '../types';

interface Props {
    isPublic: boolean;
    username: string;
    files: FileCard[];
}

const AppPage = ({ isPublic, username, files }: Props) => {
    const size = useMemo(() => 30, []);

    return (
        <div className={styles.app}>
            <div className={styles.buttons}>
                {!isPublic && <PublicPageImage size={size} />}
                <UploadImage size={size} />
                <UploadLinkImage size={size} />
                {!isPublic && <QuitImage size={size} />}
            </div>

            <div className={styles.content}>
                <div className={styles.username}>
                    {isPublic ? [username, 'public'].join(' / ') : username}
                </div>

                <div className={files.length === 0 ? styles.dropImage : styles.cardsField}>
                    {files.length === 0 && <Image src="/svg/box.svg" width={415} height={150} />}
                    {files.map(file => <FileCardComponent file={file} />)}
                </div>
            </div>
        </div>
    );
}

export default AppPage;
