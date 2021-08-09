import { useRef } from 'react';

import LoginButton from './loginbutton';
import CloseButton from './svg/close'

import styles from '../styles/Popup.module.css';

interface Props {
    visible: boolean;
    close(): void;
    uploadLink: (info: string | undefined) => Promise<void>;
}

const SendLinkPopup = ({ visible, close, uploadLink }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={visible ? styles.wrapper : undefined}>
            <div className={visible ? styles.popupVisible : styles.popupUnvisible }>
                <div className={styles.captionBox}>
                    <span>Sending link</span>
                </div>

                <CloseButton size={30} closePopup={close} />

                <input ref={inputRef} className={styles.linkInput} type="text" />

                <LoginButton caption="Send" onClick={() => uploadLink(inputRef.current?.value)} />
            </div>
        </div>
    );
}

export default SendLinkPopup;
