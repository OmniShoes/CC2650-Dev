import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import useStore from './store';

import Home from './pages/Home';
import Settings from './pages/Settings';
import NoMatch from './pages/NoMatch';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const isLoading = useStore((state) => state.state.isLoading);
  return (
    <>
      {isLoading && <LoadingScreen />}
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/settings" exact>
            <Settings />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
