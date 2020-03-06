# 10 React Router

이 프로젝트에서는 React Project 에서 router 를 이용하여 페이지 간 전환을 어떻게 하는지 알아보려 합니다.

### Router 가 왜 필요한가요?

기존의 Ruby on Rails 프로젝트나 Spring boot 프로젝트 등을 이용하여 `monolithic` 방식으로 작성된 코드에서는 `backend` 에서 `route` 처리를 모두 진행하고 `frontend` 에서는 화면을 구성하는 것에만 집중했기 때문에 `frontend` 에서 별도의 `route` 기능을 사용할 필요가 없었습니다.

하지만, `backend api` + `frontend` 구성으로 프로젝트가 진행이 된다면 `frontend` 에서 화면 간의 전환을 담당하기 위해 `route` 기능을 이용해야 할 필요가 있습니다. `route` 라는 것은

> 사용자에 의해 입력된 url (ex, `http://example.com/users/32/profile`) 을 분석하여 어떤 `container` 또는 `component` 에게 이것을 처리하게 할 것인가?

정도의 일을 수행하기 위한 기능이라고 보면 되겠습니다.

### react-router-dom

React 에서 route 기능을 이용하기 위해서는 [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) 패키지가 필요합니다.

```shell
$ yarn add react-router-dom
```

`react-router-dom` 중 url 을 분석하고 적절한 페이지로 이동시키기 위해서는 다음의 코드가 사용됩니다.

```javascript
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
```

`BrowserRoute` 는 현재 실행되는 코드가 `Browser` 에서 수행될 경우 사용하는 router 입니다. 우리는 `react-native` 나 `electron` 등을 이용하는 것이 아니기 때문에 `BrowserRouter` 를 기본적으로 사용하겠습니다. `Switch` 는 자신에게 속한 `children` 개체 중 사용자의 url 에 적합한 규칙에 해당하는 url 로 페이지를 전환하는 기능을 수행합니다. `Route` 는 본격적으로 사용자가 입력한 url 에 해당하는 component 를 매칭하는 역할을 합니다. 이제 실제 사용의 예시를 살펴보겠습니다.

```javascript
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Landing from './Landing'
import Event from './Event'
import Login from './Login'
import NotFound from './NotFound'

function Sample() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/events/:id" component={Event} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>>
  )
}
```

위의 예에서 동작하는 방식을 보자면 다음과 같습니다.

```
1. http://example.com/ 로 접속하면 Landing 페이지가 처리하도록 화면을 전환합니다.
2. http://example.com/events/32 로 접속하면 Event 페이지가 처리하도록 합니다. Event 페이지에서는 id 값으로 Parameter 를 받을 수 있습니다.
3. http://example.com/login 페이지로 접속하면 Login 페이지가 처리하도록 화면을 전환합니다.
4. 위의 3가지 경우를 제외한 나머지 URL 은 모두 NotFound 페이지가 처리하도록 화면을 전환합니다.
```

### 동적 페이지 로딩

위에서 작성한 코드만으로도 이미 괜찮습니다. 하지만 만약 처음부터 페이지를 로딩하지 않고 필요할 때 페이지를 로딩하고 싶다면 어떨까요? 즉, 아직 방문하지 않은 페이지를 모두 내려받을 필요없이 페이지를 방문하고자 할 때 필요한 페이지를 내려받아 실행할 수 있다면 어떨까요? 이렇게 된다면 [동적로딩](https://sung.codes/blog/2018/10/28/loading-react-components-dynamically-on-demand-using-react-lazy/)과 더불어 [코드분할](https://velog.io/@velopert/react-code-splitting)이 가능해 집니다.

우리는 React 16.x 버전에서 새롭게 추가된 [Suspend, lazy](https://ko.reactjs.org/docs/code-splitting.html) 기능을 이용하여 동적로딩과 코드분할을 함께 달성할 수 있습니다. (주의: SSR - Server Side Rendering 에서는 Suspend 와 lazy 가 동작하지 않습니다.) 이제 위의 코드를 변형해 보겠습니다.

```javascript
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NotFound } from './components/Errors';
import Loading from './components/Loading';

// 코드분할 및 동적로딩
const Landing = lazy(() => import('./containers/Landing'));
const Event = lazy(() => import('./containers/Event'));
const Login = lazy(() => import('./containers/Login'));

function App() {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/events/:id" component={Event} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
```

### react-spinners 이용하여 좀 더 멋있게 전환하기

페이지간 전환 시에 시간이 걸린다면 로딩 화면을 보여주면 좀 더 좋은 사용자 경험을 줄 수 있습니다. 이러한 Loader Component 를 직접 만드는 것은 어렵지 않습니다만, 이미 잘 만들어져 있는 [React Spinners](https://github.com/davidhu2000/react-spinners) 기능이 있어 이를 사용하려고 합니다.

```shell
$ yarn add react-spinners
```

패키지를 추가한 뒤 Loading Component 를 제작해 보겠습니다.

```javascript
// Loading.js

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { PulseLoader } from 'react-spinners';

const Loading = props => (
  <div
    css={css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    `}
    {...props}
  >
    <PulseLoader size={20} color={'#36D7B7'} />
  </div>
);

export default Loading;
```

이제 React Router 를 알았으니 페이지 간 전환을 통해 본인이 원하는 화면들을 만들어보세요.
