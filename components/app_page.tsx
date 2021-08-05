import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef } from 'react';

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
    const formRef = useRef<HTMLFormElement>(null);

    const size = useMemo(() => 30, []);
    const fileCards = useRef(files.filter(
        file => (file.is_public === 'true') === isPublic)
    );

    const handleFileDrop = useCallback(ev => {
        ev.preventDefault();

        if (!ev.dataTransfer) return;

        const form = formRef.current;
        for (let [field_name, value] of Object.entries({ 
            info: ev.dataTransfer.files[0].name,  is_file: true, is_public: isPublic,
            file: ev.dataTransfer.files, user_id: isPublic ? user_id : null
        })) {
            const input = document.createElement('input');
            input.type = field_name === 'file' ? 'file': 'hidden';
            
            input.name = field_name;
    
            if (field_name === 'file') input.files = value;
            else input.value = value;

            console.log(field_name, value);

            form?.appendChild(input);
        }

        form?.submit();
    }, []);

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

                <div 
                    onDragOver={ev => ev.preventDefault()} onDragEnter={ev => ev.preventDefault()}
                    onDrop={handleFileDrop}
                    className={fileCards.current.length === 0 ? styles.dropImage : styles.cardsField} 
                >
                    {fileCards.current.length === 0 ? 
                        <Image src="/svg/box.svg" width={415} height={150} /> : 
                        fileCards.current.map(fileCard => 
                            <FileCardComponent key={fileCard.file_id} file={fileCard} />)}
                </div>

                <form 
                    ref={formRef} action="/api/files/upload" method="post" 
                    encType="multipart/form-data"
                >
                </form>
            </div>
        </div>
    );
}

export default AppPage;
