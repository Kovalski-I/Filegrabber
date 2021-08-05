import Footer from './footer';

import styles from '../styles/Error.module.css';

interface Props {
    title: string;
    caption: string;
}

const ErrorComponent = ({ title, caption }: Props) => (
    <div className={styles.error}>
        <div className={styles.title}>
            {title}
        </div>

        <div className={styles.caption}>
            {caption}
        </div>

        <Footer inError />
    </div>
);

export default ErrorComponent;
