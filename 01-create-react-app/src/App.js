import React from 'react';
import logo from './logo.svg';
import './App.css';

// const App = () => (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p>
//       <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
//         Learn React
//       </a>
//     </header>
//   </div>
// );

class App extends React.Component {
  state = {
    count: 0,
  };

  onIncrease = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  onDecrease = () => {
    this.setState({ count: this.state.count - 1 });
  };

  onIncreaseBy = diff => {
    this.setState({ count: this.state.count + diff });
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.count}</h1>
        <button onClick={() => this.onIncrease()}>+1 increase</button>
        <button onClick={() => this.onDecrease()}>-1 decrease</button>
        <button onClick={() => this.onIncreaseBy(5)}>+5 increase</button>
      </div>
    );
  }
}

export default App;
