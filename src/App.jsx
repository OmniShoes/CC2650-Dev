import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import Settings from './pages/Settings';
import NoMatch from './pages/NoMatch';
import LoadingScreen from './components/LoadingScreen';
import ReloadPrompt from './components/ReloadPrompt';

export default function App() {
  return (
    <>
      <LoadingScreen />
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
      <ReloadPrompt />
    </>
  );
}
