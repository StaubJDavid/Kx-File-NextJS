import '../styles/global.css';
import { AppProps } from 'next/app';
import store from '../redux/store';
import { Provider } from 'react-redux'
import { useEffect } from 'react';
import { hasCookie, getCookies } from 'cookies-next';
import Layout from '../components/layout';

const App = ({Component, pageProps}: AppProps) => {
    
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default App;