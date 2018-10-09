import React from 'react';

import PrivateHeader from './PrivateHeader';

class Dashboard extends React.Component{
  componentDidMount(nextState){
    Session.set('currentPagePrivacy', "auth");
  }
  render(){
    return (
      <div>
        <PrivateHeader title="Strathy Unit"/>
        <div className="page-content">
          <div className="page-content__sidebar">
          </div>
          <div className="page-content__main">
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;