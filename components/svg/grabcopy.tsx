import { useState } from 'react';

import utils from '../../styles/Utils.module.css';

const GrabCopyImage = ({ size }: { size: number }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <svg
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} 
            width={size} height={size} viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                className={hovered ? utils.imageHovered : utils.imageUnhovered}
                d="M3.1 27.9H24.8V31H3.1C1.395 31 0 29.6205 0 27.9V6.2H3.1V27.9ZM28.241 0H8.959C7.44 0 6.2 1.24 6.2 2.759V22.041C6.2 23.56 7.44 24.8 8.959 24.8H28.241C29.76 24.8 31 23.56 31 22.041V2.759C31 1.24 29.76 0 28.241 0ZM26.35 17.98L24.18 20.15L18.6 14.57L13.02 20.15L10.85 17.98L16.43 12.4L10.85 6.82L13.02 4.65L18.6 10.23L24.18 4.65L26.35 6.82L20.77 12.4L26.35 17.98Z" 
                fill="#EFEFEF"
            />
        </svg>
    );
}

export default GrabCopyImage;
