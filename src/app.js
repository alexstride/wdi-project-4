import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './components/utilities/ProtectedRoute';
import Home from './components/Home';
import Nav from './components/utilities/Nav';
import PupilLogin from './components/pupils/PupilLogin';
import PupilIndex from './components/pupils/PupilIndex';
import PupilShow from './components/pupils/PupilShow';
import TeacherLogin from './components/teachers/TeacherLogin';
import TeacherRegister from './components/teachers/TeacherRegister';
import HomeworksShow from './components/homeworks/HomeworksShow';
import FlashMessage from './components/utilities/FlashMessage';
import CreateHomework from './components/homeworks/CreateHomework';

import './scss/bulma/css/bulma.css';
import './scss/partials/_homeworkIndexStyles.scss';
import './scss/style.scss';


class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Nav />
            <FlashMessage />
            <Switch>
              <Route exact path="/" component={Home} />
              <ProtectedRoute exact path="/pupils" component={PupilIndex} />
              <Route exact path="/pupils/login" component={PupilLogin} />
              <ProtectedRoute exact path="/pupils/:id" component={PupilShow} />
              <Route exact path="/teachers/login" component={TeacherLogin} />
              <Route exact path="/teachers/register" component={TeacherRegister} />
              <ProtectedRoute exact path="/pupils/:id/homeworks/:homeworkId" component={HomeworksShow} />
              <ProtectedRoute exact path="/homeworks/new" component={CreateHomework} />
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
