import type { ReactNode } from 'react';

import styles from '../styles/pages/Main.module.css';

interface Props {
    left: () => ReactNode;
    right: () => ReactNode;
    reverse?: boolean;
}

const Info = ({ left, right, reverse}: Props) => (
    <div className={styles.info}>
        <div className={reverse ? styles.infoRight : styles.infoLeft}>
            {left()}
        </div>
        <div className={reverse ? styles.infoLeft : styles.infoRight}>
            {right()}
        </div>
    </div>
);

export default Info;
