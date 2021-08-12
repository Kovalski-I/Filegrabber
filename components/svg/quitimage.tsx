import { useState } from 'react';

import styles from '../../styles/App.module.css';

const QuitImage = ({ size }: { size: number }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div title="Quit from the app" tabIndex={0}>
            <svg 
                onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                width={size} height={size * 1.25} viewBox="0 0 55 69" fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    className={hovered ? styles.imageHovered : styles.imgUnhovered}
                    d="M58.6667 0H7.33333C3.26333 0 0 3.16444 0 7.11111V21.3333H7.33333V7.11111H58.6667V56.8889H7.33333V42.6667H0V56.8889C0 58.7749 0.772617 60.5836 2.14788 61.9172C3.52315 63.2508 5.38841 64 7.33333 64H58.6667C60.6116 64 62.4768 63.2508 63.8521 61.9172C65.2274 60.5836 66 58.7749 66 56.8889V7.11111C66 3.16444 62.7 0 58.6667 0ZM25.96 44.7289L31.1667 49.7778L49.5 32L31.1667 14.2222L25.96 19.2356L35.4567 28.4444H0V35.5556H35.4567L25.96 44.7289Z" 
                    fill="#EFEFEF"
                />
            </svg>
        </div>
    );
}

export default QuitImage;
