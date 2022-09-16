import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import 'highlight.js/styles/night-owl.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
