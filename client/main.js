import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import {routes,onAuthChange} from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';


Meteor.startup( () =>{
  Session.set('isNavOpen',false);
  ReactDOM.render(routes,document.getElementById('app'));
});

Tracker.autorun(()=>{
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  onAuthChange(isAuthenticated,currentPagePrivacy);
});

Tracker.autorun(() =>{
  const isNavOpen = Session.get('isNavOpen');

  document.body.classList.toggle('is-nav-open',isNavOpen);
});