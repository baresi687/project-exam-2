import Layout from './components/layout/Layout.jsx';
import { ScrollRestoration } from 'react-router-dom';

function App() {
  return (
    <>
      <Layout />
      <ScrollRestoration />
    </>
  );
}

export default App;
