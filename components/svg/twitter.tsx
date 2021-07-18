import { useState } from 'react';

import styles from '../../styles/Footer.module.css';

const TwitterImage = ({ size }: { size: number }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <a href="https://twitter.com/kovalskii_i">
            <svg 
                width={size} height={size} 
                className={styles.image}
                onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                viewBox="0 0 97 78" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    className={hovered ? styles.imgHovered : styles.imgUnhovered} 
                    d="M96.3833 9.16667C92.8542 10.7708 89.05 11.825 85.1083 12.3292C89.1417 9.9 92.2583 6.05 93.725 1.42083C89.9208 3.7125 85.7042 5.31667 81.2583 6.23333C77.6375 2.29167 72.55 0 66.775 0C56.0042 0 47.2042 8.8 47.2042 19.6625C47.2042 21.2208 47.3875 22.7333 47.7083 24.1542C31.3917 23.3292 16.8625 15.4917 7.19167 3.62083C5.49583 6.50833 4.53333 9.9 4.53333 13.475C4.53333 20.3042 7.97083 26.3542 13.2875 29.7917C10.0333 29.7917 7.00833 28.875 4.35 27.5C4.35 27.5 4.35 27.5 4.35 27.6375C4.35 37.1708 11.1333 45.1458 20.1167 46.9333C18.4667 47.3917 16.725 47.6208 14.9375 47.6208C13.7 47.6208 12.4625 47.4833 11.2708 47.2542C13.7458 55 20.9417 60.775 29.6042 60.9125C22.9125 66.2292 14.4333 69.3458 5.175 69.3458C3.61667 69.3458 2.05833 69.2542 0.5 69.0708C9.20833 74.6625 19.5667 77.9167 30.6583 77.9167C66.775 77.9167 86.6208 47.9417 86.6208 21.9542C86.6208 21.0833 86.6208 20.2583 86.575 19.3875C90.425 16.6375 93.725 13.1542 96.3833 9.16667Z"
                    fill="#EFEFEF"
                />
            </svg>
        </a>
    );
}

export default TwitterImage;
