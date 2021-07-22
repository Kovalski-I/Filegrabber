import { useState } from 'react';

import styles from '../../styles/App.module.css';

const UploadImage = ({ size }: { size: number }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <svg 
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            width={size} height={size * 1.25} viewBox="0 0 55 69" fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                className={hovered ? styles.imageHovered : styles.imgUnhovered}
                d="M17.1667 55.7917V30.0417H0L30.0417 0L60.0833 30.0417H42.9167V55.7917H17.1667ZM0 72.9583V64.375H60.0833V72.9583H0Z" 
                fill="#EFEFEF"
            />
        </svg>
    );
}

export default UploadImage;
