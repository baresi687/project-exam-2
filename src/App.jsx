import Layout from './components/layout/Layout.jsx';
import { ScrollRestoration } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext.jsx';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Layout />
      </AuthContextProvider>
      <ScrollRestoration />
    </>
  );
}

export default App;
