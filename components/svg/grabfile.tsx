import { useState } from 'react';

import utils from '../../styles/Utils.module.css';

const GrabFileImage = ({ size }: { size: number }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <svg
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} 
            width={size} height={size} viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                className={hovered ? utils.imageHovered : utils.imageUnhovered}
                d="M27.5556 0H22.9056H8.09444H3.44444C2.53092 0 1.65481 0.362896 1.00885 1.00885C0.362896 1.65481 0 2.53092 0 3.44444V8.09444V23.0778V27.5556C0 28.4691 0.362896 29.3452 1.00885 29.9911C1.65481 30.6371 2.53092 31 3.44444 31H8.09444H23.0778H27.5556C28.4691 31 29.3452 30.6371 29.9911 29.9911C30.6371 29.3452 31 28.4691 31 27.5556V22.9056V8.09444V3.44444C31 2.53092 30.6371 1.65481 29.9911 1.00885C29.3452 0.362896 28.4691 0 27.5556 0ZM21.7 24.1111L15.5 17.9111L9.3 24.1111L6.88889 21.7L13.0889 15.5L6.88889 9.3L9.3 6.88889L15.5 13.0889L21.7 6.88889L24.1111 9.3L17.9111 15.5L24.1111 21.7L21.7 24.1111Z" 
                fill="#EFEFEF"
            />
        </svg>
    );
}

export default GrabFileImage;
