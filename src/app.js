import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import socketIOClient from 'socket.io-client';


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
import NoRoute from './components/utilities/NoRoute';
import PupilCreate from './components/pupils/PupilCreate';
import ShowHomeworkByQuestion from './components/homeworks/ShowHomeworkByQuestion';

import './scss/bulma/css/bulma.css';
import './scss/partials/_homeworkIndexStyles.scss';
import './scss/style.scss';


class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.state.endpoint = 'http://127.0.0.1:4000';
    this.state.webSocket = socketIOClient(this.state.endpoint);
  }

  componentDidMount() {
    this.state.webSocket.on('submitted', data => console.log('Work submitted by pupil: ', data));
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Nav/>
            <FlashMessage />
            <Switch>
              <Route exact path="/" component={Home} />
              <ProtectedRoute exact path="/pupils" component={PupilIndex} innerProps={{socket: this.state.webSocket}} socket={this.state.webSocket}/>
              <ProtectedRoute exact path="/pupils/new" component={PupilCreate} />
              <Route exact path="/pupils/login" component={PupilLogin} />
              <ProtectedRoute exact path="/pupils/:id" component={PupilShow} />
              <Route exact path="/teachers/login" component={TeacherLogin} />
              <Route exact path="/teachers/register" component={TeacherRegister} />
              <ProtectedRoute exact path="/pupils/:id/homeworks/:homeworkId" component={HomeworksShow} />
              <ProtectedRoute exact path="/homeworks/new" component={CreateHomework} />
              <ProtectedRoute exact path="/homeworks/:setDate/question/:number" component={ShowHomeworkByQuestion}/>
              <Route component={NoRoute} />
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
