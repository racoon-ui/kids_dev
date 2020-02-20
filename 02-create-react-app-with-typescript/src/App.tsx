import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+1 increase</button>
      <button onClick={() => setCount(count - 1)}>+1 decrease</button>
      <button onClick={() => setCount(count + 5)}>+5 increase</button>
    </div>
  );
}

export default App;
