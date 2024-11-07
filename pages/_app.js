import "../src/styles/main.scss";
import { ApolloProvider } from "@apollo/client";
import Router from 'next/router';
import NProgress from 'nprogress';

import client from "../src/components/ApolloClient";
import { AppProvider } from "../src/components/context/AppContext";


NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    
      <AppProvider>
       
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          
      </AppProvider>
   
  );
}

export default MyApp;
