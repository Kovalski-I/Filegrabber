import styles from '../styles/Login.module.css';

const LoginButton = ({ caption }: { caption: string }) => (
    <div className={styles.loginButton}>
        <span>{caption}</span>
    </div>
);

export default LoginButton;
