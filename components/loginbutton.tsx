import styles from '../styles/Login.module.css';

interface Props {
    caption: string;
    onClick: () => void;
}

const LoginButton = ({ caption, onClick }: Props) => (
    <div className={styles.loginButton} onClick={onClick} tabIndex={0}>
        <span>{caption}</span>
    </div>
);

export default LoginButton;
