import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import 'highlight.js/styles/night-owl.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shaif&lsquo;s Blog</title>
        <meta
          name="description"
          content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis deserunt"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
