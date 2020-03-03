# 09 React Hooks

이 프로젝트에서는 React 16.8 버전부터 추가된 `hooks` 기능에 대해 알아보고자 합니다.

### Hooks 는 무엇인가?

React 에서는 컴포넌트간의 데이터 교환 또는 재사용 가능한 행동을 붙이는 방법에 대한 고민이 많았습니다. 이러한 고민들의 결과로 나온 것들이 [Render Props](https://ko.reactjs.org/docs/render-props.html), [HoC - Higher order Component](https://ko.reactjs.org/docs/higher-order-components.html) 와 같은 것들이 있습니다.

한때 `Hoc` 는 컴포넌트들 간의 데이터 전달(교환)에 획기적인 방안을 제공하며, React 내의 많은 라이브러리들이 HoC 방식으로 제작이 되곤 했었습니다. 특히, React 에서 가장 중요하게 인식되는 기능 중 하나인 Redux 를 사용할 때는 `redux`, `react-redux` 라이브러리에서 제공하는 HoC 기능을 이용하여 컴포넌트 간의 상태 교환에 중요한 코드로 자리 매김을 한 적도 있었습니다.

하지만 여전히 HoC 방식의 코드는 다소 어려웠고, 그 모양도 자연스럽지 못했습니다. (물론, HoC 방식의 코드 형태가 좋다는 사람도 많습니다.) 이런 와중에 React 16.8 버전부터 소개된 React Hooks 라는 기능은 아주 급속도로 React 생태계에 녹아 들어갔으며 이제는 React 기술에서 없어서는 안될 중요한 기능으로 자리매김 하고 있습니다.

현재는 HoC 때 그랬듯이 많은 라이브러리들이 Custom Hook 방식으로 제작되고 있으며, 사용자들은 좀 더 직관적이고 쉬운 방식으로 라이브러리를 이용할 수 있게 되었습니다.

Custom Hook 을 만드는 방법은 나중에 하는 것으로 하고, 이 장에서는 React 에서 기본적으로 제공하는 몇 가지의 Hook 에 대해 알아보고자 합니다.

```
React 16.8 버전부터 추가된 hooks

1. 기본 훅 (웬만하면 기본 훅만 사용해도 크게 무리는 없음)
   - useState: component 내의 state 값을 처리하고자 할 때 사용
   - useEffect: 화면이 시작될 때 / 업데이트 될 때 등에서 사용 (사용시 매우 주의해야 함)
   - useContext: React.createContext 로 생성된 Global Context 의 내용을 연동할 경우 사용
   - useRef: 특정 DOM Element 를 참조해야 할 경우 필요
2. 추가 훅 (추가 훅은 기본 Hook 의 변형이거나 특별한 경우에만 사용되는 경우임)
   - useReducer: useState를 redux 방식으로 사용하기 위한 hook
   - useCallback: useMemo 와 동일하게 렌더링 효율을 올리기 위해 사용되는 hook 임
   - useMemo: 인자로 전달되는 값에 대한 변화가 감지될 때만 callback 수행이 될 수 있도록 하여 불필요한 랜더링 수행을 방지
```

### useState

useState 는 가장 기본적인 hook 으로 기존의 `React.Component` 방식으로 제작된 코드에서 `state` 를 관리하기 위한 부분이라고 보면 됩니다. 아래 예제에서 기본적인 사용방법을 볼 수 있습니다.

```jsx
import React, { useState } from 'react';

function App() {
  const [profile, setProfile] = useState('');

  render(
    <React.Fragment>
      <input type="text" value={profile} onChange={e => setProfile(e.target.value)} />
    </React.Fragment>,
  );
}
```

```jsx
const [profile, setProfile] = useState('');
```

`useState` hook 을 사용하면 첫번째 인자로 데이터 저장소를, 두번째 인자로 데이터를 조작하기 위한 함수를 받을 수 있는 배열이 리턴이 됩니다. 위 코드는 기존의 다음 코드와 완벽히 호환됩니다.

```jsx
import React from 'react';

class App extends React.Component {
  state = {
    profile: '',
  };

  const setProfile = (str) => {
    this.setState({
      profile: str
    })
  }

  render () {
    return (
      <React.Fragment>
        <input type="text" value={this.state.profile} onChange={(e) => this.setProfile(e.target.value)} />
      </React.Fragment>
    )
  }
}
```

`React hook` 의 사용으로 코드를 훨씬 간결하게 유지할 수 있습니다.

### useEffect

`useEffect` 는 기존의 componentDidMount 또는 componentDidUpdate, componentWillUnmount 등과 같은 함수를 대체합니다. 우선, 아래의 예제를 통해 간단하게 사용법을 보겠습니다.

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get('/profile')
      .then(res => {
        setProfile(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  render(
    <React.Fragment>
      <div className="profile-container">{profile && <span>Your profile is {profile}</span>}</div>
    </React.Framgment>,
  );
}
```

`axios` 라이브러리를 이용하여 서버에서 profile 정보를 가져온 뒤 profile 정보를 표시하는 예제입니다. `useEffect` 를 사용할 때는 다음의 3가지를 꼭 생각하고 사용해야 합니다.

```
1. useEffect 함수가 어떤 역할을 하는 함수인지 알고 있어야 합니다.
2. useEffect 함수가 trigger 되는 시점이 어떤 시점인지 알고 있어야 합니다.
3. useEffect 함수에서 발생될 수 있는 부작용을 이해하고 있어야 합니다.
```

`useEffect` 함수는 위에서 말한대로 기존의 componentDidMount, componentDidUpdate, componentWillUnmount 를 대체할 수 있습니다. 함수는 하나인데 어떻게 세가지의 기존 함수를 대체할 수 있을까요? 아래의 코드를 살펴보겠습니다.

```jsx
// useEffect 에서 별도의 인자를 넘기지 않을 때

useEffect(() => {
  axios
    .get('/profile')
    .then(res => {
      setProfile(res.data);
    })
    .catch(err => {
      console.log(err);
    });
});
```

위의 예에서와 같이 `useEffect` 함수를 사용함에 있어 `[]` 와 같은 별도의 인자를 두번째 인자로 넣지 않으면, `useEffect` 는 다음과 같은 경우에 모두 호출이 됩니다.

```
1. 컴포넌트가 처음 마운트 될 때 - componentDidMount
2. 컴포넌트 내의 상태(state) 값이 변경되어 render () 함수가 호출될 때 - componentDidUpdate
3. 컴포넌트가 제거될 때 - componentWillUnmount (하지만 return 구문이 없기 때문에 동작하지 않음)
```

일반적으로 위와 같은 경우에서 모두 `useEffect` 함수가 호출된다면 원하지 않는 경우가 발생될 수 있습니다. 특히, 위와 같이 서버에서 정보를 가져오는 코드가 포함되어 있을 경우에는 의도치 않게 많은 서버 호출이 발생될 수 있습니다.

그렇다면, 컴포넌트가 사용될 때 최초 한번만 동작하게 하려면 어떻게 하면 될까요?

```jsx
// useEffect 에서 두번째 인자로 [] 을 전달할 때

useEffect(() => {
  axios
    .get('/profile')
    .then(res => {
      setProfile(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}, []);
```

위와 같이 코드를 작성하면, 이제부터 `useEffect` 는 `componentDidMount` 상태일 때만 동작하게 됩니다. 그렇다면, 컴포넌트 내의 특정 값이 변경될 때마다 호출이 되게 하고 싶다면 어떨까요?

```jsx
// useEffect 에서 두번째 인자로 [살펴보는 값] 을 전달할 때

useEffect(() => {
  axios
    .get('/profile')
    .then(res => {
      setProfile(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}, [살펴보는 값]);
```

위와 같이 `[]` 내에 살펴보고자 하는 어떤 상태값을 넣게 되면 해당 상태값의 변화가 있을 때마다 `useEffect` 함수가 호출됩니다.
