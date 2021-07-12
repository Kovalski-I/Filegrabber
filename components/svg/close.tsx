import Image from 'next/image';
import { useState } from 'react';

import styles from '../../styles/Popup.module.css';

interface Props {
    size: number;
    closePopup: () => void;
}

const CloseButton = ({ size, closePopup }: Props) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className={styles.closeButton} >
            <svg width={size} height={size} 
                 onClick={closePopup} 
                onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path className={hovered ? styles.buttonHovered : styles.buttonUnhovered} 
                    d="M51.9167 5.22875L46.6879 0L25.9583 20.7296L5.22875 0L0 5.22875L20.7296 25.9583L0 46.6879L5.22875 51.9167L25.9583 31.1871L46.6879 51.9167L51.9167 46.6879L31.1871 25.9583L51.9167 5.22875Z" fill="#515151"
                />
            </svg>
        </div>
    );
}

export default CloseButton;
