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
        <button
          class="snipcart-add-item"
          data-item-id="starry-night"
          data-item-price="79.99"
          data-item-url="http://www.mariomall.co.kr/Detail?PCODE=P000845636&PID=1502&SearchKeyword=%EC%9B%90%ED%94%BC%EC%8A%A4"
          data-item-description="플라워 패턴 티어드 맥시 원피스 T19MAXSkd"
          data-item-image="http://cdn.mariooutlet.com/Product/A0133/A7F/P000845636_d1.jpg?AR=0&RS=520X660"
          data-item-name="써스데이 아일랜드"
        >
          Add to cart
        </button>
        <button onClick={() => this.onIncrease()}>+1 increase</button>
        <button onClick={() => this.onDecrease()}>-1 decrease</button>
        <button onClick={() => this.onIncreaseBy(5)}>+5 increase</button>
      </div>
    );
  }
}

export default App;
