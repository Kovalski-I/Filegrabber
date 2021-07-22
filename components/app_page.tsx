import { useEffect, useMemo } from 'react';

import PublicPageImage from './svg/publicpage';
import UploadImage from './svg/uploadimage';
import UploadLinkImage from './svg/uploadlink';
import QuitImage from './svg/quitimage';

import styles from '../styles/App.module.css';

interface Props {
    isPublic: boolean;
    username: string;
}

const AppPage = ({ isPublic, username }: Props) => {
    const size = useMemo(() => 62, []);

    return (
        <div className={styles.app}>
            <div className={styles.buttons}>
                {isPublic && <PublicPageImage size={size} />}
                <UploadImage size={size} />
                <UploadLinkImage size={size} />
                {isPublic && <QuitImage size={size} />}
            </div>

            <div className={styles.content}>
                <div className={styles.username}>
                    {isPublic ? [username, 'public'].join(' / ') : username}
                </div>


            </div>
        </div>
    );
}

export default AppPage;
