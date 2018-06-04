import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import App from 'components/App';
import { HomePage } from 'components';
import LoginPage from 'components/pages/LoginPage';
import NewPostPage from 'components/pages/NewPostPage';
import ContentDetailPage from 'components/pages/ContentDetailPage';
import SignUpPage from 'components/pages/SignUpPage';
import ProfilePage from 'components/pages/ProfilePage';

const routes = (
  <Router basename="/">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/newpost" component={NewPostPage} />
      <Route exact path="/saledetail/:id" component={ContentDetailPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/profile" component={ProfilePage} />
    </Switch>
  </Router>
);

export default routes;
