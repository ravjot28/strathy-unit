import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {Link} from 'react-router-dom';
import { Configurations } from '../../api/configurations';
import StaticModal from '../components/StaticModal';


class  PrivateHeader extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.state = {
      lgShow: false,
    };
  }
  render(){
    let lgClose = () => this.setState({ lgShow: false });
    let aboutConfig = undefined;
    let faqConfig = undefined;
    let downloadAudioConfig = undefined;
    this.props.configurations.forEach((configuration)=>{
      if(configuration.key === 'FAQ'){
        faqConfig = configuration;
      }else if(configuration.key === 'About'){
        aboutConfig = configuration;
      }else if(configuration.key === 'Download Audio'){
        downloadAudioConfig = configuration;
      }
    });

    

  return (
    <Navbar inverse collapseOnSelect> 
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">{this.props.title}</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
       {aboutConfig ?  
        <LinkContainer to="#">
          <NavItem eventKey={1} onClick={() => this.setState({ lgShow: true,title:aboutConfig.key, body:aboutConfig.value })} >{aboutConfig.key}</NavItem>
        </LinkContainer>:undefined}
        
        <LinkContainer to="#">
          <NavItem eventKey={2}>Add Audio</NavItem>
        </LinkContainer>
        {downloadAudioConfig ? 
          <LinkContainer to="#">
            <NavItem eventKey={2} onClick={() => this.setState({ lgShow: true,title:downloadAudioConfig.key, body:downloadAudioConfig.value })} >{downloadAudioConfig.key}</NavItem>
          </LinkContainer>:undefined}
        {faqConfig ? 
          <LinkContainer to="#">
            <NavItem eventKey={2} onClick={() => this.setState({ lgShow: true,title:faqConfig.key, body:faqConfig.value })} >{faqConfig.key}</NavItem>
          </LinkContainer>:undefined}
          
        <LinkContainer to="/changeConfig">
          <NavItem eventKey={2} >Change Configurations</NavItem>
        </LinkContainer>
        </Nav>
      <Nav pullRight>
        <NavItem eventKey={2} onClick={() => this.props.handleLogout()}>Logout</NavItem>
      </Nav>
      <StaticModal show={this.state.lgShow} onHide={lgClose} subheading={this.state.subheading} title={this.state.title} body={this.state.body}/>

    </Navbar>
  );
  }
}
export default createContainer(() => {

  Meteor.subscribe('configurations');
  return {
    handleLogout: () => Accounts.logout(),
    configurations: Configurations.find({}).fetch().map((configuration) => {
      return {
        ...configuration
      };
    })
  };
}, PrivateHeader);