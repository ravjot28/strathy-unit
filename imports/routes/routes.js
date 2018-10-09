import React from 'react';
import {Router, Route,Switch} from 'react-router-dom';
import {Session} from 'meteor/session';
import {history} from './BrowserHistory';

import Signup from '../ui/user/Signup';
import Login from '../ui/user/Login';
import NotFound from '../ui/NotFound';
import Dashboard from '../ui/dashboard/Dashboard';
import LandingPage from '../ui/public/LandingPage';

export const onAuthChange = (isAuthenticated,currentPagePrivacy) => {

    const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
    const isAuthenticatedPage = currentPagePrivacy === 'auth';

    if(isUnauthenticatedPage && isAuthenticated){
        history.replace('/dashbaord');
    }else if(isAuthenticatedPage && !isAuthenticated){
        history.replace('/');
    }

};

export const routes = (
   <Router history={history}>
        <Switch>
            <Route exact path='/' component={LandingPage} privacy="unauth"/>
            <Route exact path='/admin' component={Login} privacy="unauth" />
            <Route exact path='/signup' component={Signup} privacy="auth" />
            <Route exact path='/dashbaord' component={Dashboard} privacy="auth" />
            <Route exact path='/changeConfig' component={Dashboard} privacy="auth" />
            <Route path='*' component={NotFound} />
        </Switch>
    </Router>
    
);
