import Link from 'next/link';

import GithubLogo from './svg/github';
import TwitterImage from './svg/twitter';

import styles from '../styles/Footer.module.css';

const Footer = () => (
    <div className={styles.footer}>
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