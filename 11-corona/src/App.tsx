import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loading from './components/Loading';

const PharmacyLoader = lazy(() => import('./containers/PharmacyLoader'));
const About = lazy(() => import('./containers/About'));

function App() {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={PharmacyLoader} />
          <Route exact path="/about" component={About} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
