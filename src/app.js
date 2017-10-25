import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import PupilLogin from './components/pupils/PupilLogin';
import HomeworksShow from './components/homeworks/HomeworksShow';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/pupils/login" component={PupilLogin} />
          <Route exact path="/homeworks/:id" component={HomeworksShow} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
