import { useEffect, useRef } from 'react';

import CloseButton from '../components/svg/close';

import styles from '../styles/Popup.module.css';

interface Props {
    visible: boolean;
    close: () => void;
}

const LoginPopup = ({ visible, close }: Props) => {
    const popupRef = useRef<HTMLDivElement>(null);

    // const keyframes = [
    //     { transform: 'translateY(-100px)', opacity: '0' }, 
    //     { transform: 'translateY(0)', opacity: '1' }
    // ];
    // const options = { duration: 200 };
    // useEffect(() => {
    //     const popup = popupRef.current;
    //     if (visible) 
    //         popup?.animate(keyframes, options)
    //     else 
    //         popup?.animate(keyframes.reverse(), options);
    // }, [visible]);

    return (
        <div className={visible ? styles.wrapper : undefined}>
            <div ref={popupRef} className={visible ? styles.popupVisible : styles.popupUnvisible}>
                <div className={styles.captionBox}>
                    <span>Logging in</span>
                </div>
                <CloseButton size={30} closePopup={close} />
            </div> 
        </div>
    );
}

export default LoginPopup;
