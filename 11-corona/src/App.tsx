import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loading from './components/Loading';
import { Helmet } from 'react-helmet-async';

const PharmacyLoader = lazy(() => import('./containers/PharmacyLoader'));
const About = lazy(() => import('./containers/About'));

function App() {
  return (
    <BrowserRouter basename="/">
      <Helmet>
        <title>Corona 19 Mask Store</title>
        <link rel="canonical" href="http://localhost:3000/" />
      </Helmet>
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
