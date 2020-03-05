import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NotFound, InternalServerError } from './components/Errors';
import Landing from './containers/Landing';
import Event from './containers/Event';

function App() {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/events/:id" component={Event} />
          <Route exact path="/login" component={Landing} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
