import ErrorComponent from '../components/error';

const ErrorPage = () => (
    <ErrorComponent 
        title="Something unexpected happened" 
        caption="Something happaned that the server doesn’t know how to respond" 
    />
);

export default ErrorPage;
