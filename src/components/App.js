import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import HomeContainer from '../containers/HomeContainer';
import LoginContainer from '../containers/LoginContainer';
import NewCourseContainer from '../containers/NewCourseContainer';
import ProfileContainer from '../containers/ProfileContainer';
import FavoritesContainer from '../containers/FavoritesContainer';
import ResultsContainer from '../containers/ResultsContainer';
import DetailsContainer from '../containers/DetailsContainer';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AuthRoute(HomeContainer)} />
          <Route path="/sign-in" component={LoginContainer} />
          <Route path="/new-course" component={PrivateRoute(NewCourseContainer)} />
          <Route path="/profile" component={PrivateRoute(ProfileContainer)} />
          <Route path="/favorites" component={PrivateRoute(FavoritesContainer)} />
          <Route path="/results" component={AuthRoute(ResultsContainer)} />
          <Route exact path="/courses/:course_id" component={AuthRoute(DetailsContainer)} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
