import { useState, useEffect } from 'react';
import ws from '@ariaket/core';
import logo from './logo.svg';
import './App.css';

const App = function () {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<unknown>) => {
      console.log(event.data);
    };
    ws.addEventListener('message', handleMessage);
    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is:
            {count}
          </button>
        </p>
        <p>
          Edit
          <code>App.tsx</code>
          and save to test HMR updates.
        </p>
        <button
          type="button"
          onClick={() => {
            ws.send(
              JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'aria2.getGlobalStat',
                params: ['token:4444'],
              }),
            );
          }}
        >
          send
        </button>
      </header>
    </div>
  );
};

export default App;
