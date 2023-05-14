import {ApolloClient, InMemoryCache} from '@apollo/client';

const CSRclient = new ApolloClient({
    uri: 'http://localhost:8080/',
    cache: new InMemoryCache()
});

//process.browser is only available in the browser
const getClient = () => {
    if (typeof window === 'undefined') {
        return new ApolloClient({
            uri: 'http://localhost:8080/',
            cache: new InMemoryCache()
        });
    } else {
        return CSRclient;
    }
};

export default getClient;