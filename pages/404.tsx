import ErrorComponent from '../components/error';

const PageNotFound = () => (
    <ErrorComponent  
        title="Page not found"
        caption="This page doesn’t seem to exist at the moment"
    />
);

export default PageNotFound;
