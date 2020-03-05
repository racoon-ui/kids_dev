import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NotFound } from './components/Errors';

const Landing = lazy(() => import('./containers/Landing'));
const Event = lazy(() => import('./containers/Event'));
const Login = lazy(() => import('./containers/Login'));

function App() {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/events/:slug" component={Event} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
