import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from './lib/Auth';

import Home from './components/Home';
import Nav from './components/Nav';
import PupilLogin from './components/pupils/PupilLogin';
import TeacherLogin from './components/teachers/TeacherLogin';
import TeacherRegister from './components/teachers/TeacherRegister';
import HomeworksShow from './components/homeworks/HomeworksShow';

import './scss/bulma/css/bulma.css';
import './scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/pupils/login" component={PupilLogin} />
              <Route exact path="/teachers/login" component={TeacherLogin} />
              <Route exact path="/teachers/register" component={TeacherRegister} />
              <Route exact path="/homeworks/" component={HomeworksShow} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
