import { createContext, useState } from 'react';
import './index.css';
import Main from './pages/Main';

export const GlobalStateContext = createContext();

export default function App() {
  const [globalState, setGlobalState] = useState({ admin: false });

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      <Main />
    </GlobalStateContext.Provider>
  );
}