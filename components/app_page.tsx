import img from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useRef, useState } from 'react';

import SendLinkPopup from './sendlink';
import FileCardComponent from '../components/filecard';
import PublicPageImage from './svg/publicpage';
import UploadImage from './svg/uploadimage';
import UploadLinkImage from './svg/uploadlink';
import QuitImage from './svg/quitimage';

import { deleteCookie } from '../lib/cookie';
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
    const router = useRouter();

    const [fileCards, setFileCards] = useState(files.reverse().filter(
        file => (file.is_public === 'true') === isPublic)
    );
    const [showSendLinkPopup, triggerSendLinkPopup] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const size = useMemo(() => 30, []);

    const deleteItem = useCallback((index: number) => {
        setFileCards(prevCards => {
            const cards = prevCards.slice();
            cards.splice(index, 1);

            return cards;
        });
    }, []);

    const getForm = useCallback(() => {
        const form = formRef.current;
        if (!form) throw new Error('form is undefined');

        return form;
    }, []);

    const uploadLink = useCallback(async (info: string | undefined) => {
        if (!info && info !== '') throw new Error('info is undefined');

        try {
            new URL(info);
        } catch (e) {
            alert('URL is not valid');
            return;
        }

        const form = getForm();

        for (let [name, value] of Object.entries({ 
            info, is_file: 'false', is_public: isPublic.toString(), user_id
        })) {
            const input = document.createElement('input');
            input.name = name;
            input.value = value;

            form.appendChild(input);
        }
        
        form.submit();
    }, [isPublic, user_id, getForm]);

    const handleFileDrop = useCallback(async (ev, files) => {
        ev.preventDefault();

        if (!(ev.dataTransfer || files)) return;

        const form = getForm();

        for (let [name, value] of Object.entries({ 
            info: files[0].name, user_id, is_file: 'true', is_public: isPublic.toString(),
            file: files
        })) {
            const input = document.createElement('input');
            input.type = name === 'file' ? 'file': 'text'
            
            input.name = name;
    
            if (name === 'file') input.files = value;
            else input.value = value;

            form.appendChild(input);
        }

        if (fileCards.length === 20) 
            throw new Error('20 files are limit yet');

        form.submit();
    }, [isPublic, user_id, fileCards.length, getForm]);

    const handleLogout = useCallback(async () => {
        document.cookie = deleteCookie('user_hash');
        router.push('/');
    }, [router]);

    return (
        <div className={styles.app}>
            <div className={styles.buttons}>
                {!isPublic && 
                    <Link href={`/public/${getHash(user_id)}`}>
                        <a target="_blank">
                            <PublicPageImage size={size} />
                        </a>
                    </Link>}
                <div onClick={() => fileInputRef.current?.click()}>
                    <UploadImage size={size} />
                </div>
                <div onClick={() => triggerSendLinkPopup(true)}>
                    <UploadLinkImage size={size} />
                </div>
                {!isPublic && 
                    <div onClick={handleLogout}>
                        <QuitImage size={size} />
                    </div>}
            </div>

            <div className={styles.content}>
                <div className={styles.username}>
                    {isPublic ? [username, 'Public'].join(' / ') : username}
                </div>

                <div 
                    onDragOver={ev => ev.preventDefault()} onDragEnter={ev => ev.preventDefault()}
                    onDrop={ev => handleFileDrop(ev, ev.dataTransfer.files)}
                    className={fileCards.length === 0 ? styles.dropImage : styles.cardsField} 
                >
                    {fileCards.length === 0 ? 
                        <img src="/svg/box.svg" alt="Box vector image" width={415} height={150} /> : 
                        fileCards.map((fileCard, index) => 
                            <FileCardComponent 
                                key={fileCard.file_id} file={fileCard}
                                deleteItem={deleteItem} flag={index}
                            />)}
                </div>

                <form 
                    ref={formRef} action="/api/files/upload" method="post" 
                    className={styles.fileInput} encType="multipart/form-data"
                >
                    <input 
                        type="file" ref={fileInputRef} 
                        onChange={ev => handleFileDrop(ev, fileInputRef.current?.files)} 
                    />
                </form>
            </div>

            <SendLinkPopup 
                visible={showSendLinkPopup} 
                close={() => triggerSendLinkPopup(false)} 
                uploadLink={uploadLink}
            />
        </div>
    );
}

export default AppPage;
