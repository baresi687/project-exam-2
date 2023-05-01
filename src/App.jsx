import Layout from './components/layout/Layout.jsx';
import { ScrollRestoration } from 'react-router-dom';
import { useState } from 'react';
import { AuthContext } from './context/AuthContext.js';

function App() {
  const [auth, setAuth] = useState(null);

  return (
    <>
      <AuthContext.Provider value={[auth, setAuth]}>
        <Layout />
      </AuthContext.Provider>
      <ScrollRestoration />
    </>
  );
}

export default App;
