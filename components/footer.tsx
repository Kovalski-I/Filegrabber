import Link from 'next/link';

import GithubLogo from './svg/github';
import TwitterImage from './svg/twitter';

import styles from '../styles/Footer.module.css';

const Footer = ({ inMain, inError }: { inMain?: boolean, inError?: boolean }) => (
    <div className={(() => { 
        if (inMain) return styles.footerMain;
        else if (inError) return styles.footerError;
        else return styles.footer;
        })()}
    >
        <Link href="/">Main</Link>
        <a className={styles.contact} href="mailto: timkovalskii@gmail.com">Contact</a>

        <GithubLogo size={55} />
        <TwitterImage size={55} />

        <span className={styles.copyright}>
            © {new Date().getFullYear()} Tymofii Koval
        </span>
    </div>
);

export default Footer;