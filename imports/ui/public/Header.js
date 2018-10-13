import React from 'react';
import { Navbar, Nav, NavItem,NavDropdown,MenuItem,UncontrolledDropdown } from 'react-bootstrap';
import StaticModal from '../components/StaticModal';
import { LinkContainer } from 'react-router-bootstrap';
import {Link} from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Configurations } from '../../api/configurations';
import Multiselect from 'react-bootstrap-multiselect';

class Header extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.state = {
      lgShow: false,
      myData : [{value:'One',selected:true},{value:'Two'}]
    };
  }

  render() { 
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
      <Navbar collapseOnSelect> 
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">{this.props.title}</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav >
        {aboutConfig ?  
        <LinkContainer to="#">
          <NavItem eventKey={1} onClick={() => this.setState({ lgShow: true,title:aboutConfig.key, body:aboutConfig.value })} >{aboutConfig.key}</NavItem>
        </LinkContainer>:undefined}
        <LinkContainer to="/addAudio">
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
          
          <LinkContainer to="/admin">
            <NavItem eventKey={2}>Admin</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <NavItem>Filters:</NavItem>
          <NavItem><input type="text" placeholder="Min Age" style={{height:10, margin:0,width:100}} /></NavItem>
          <NavItem><input type="text" placeholder="Max Age" style={{height:10, margin:0,width:100}}/></NavItem>
          <NavItem> <Multiselect data={this.state.myData} multiple/>
          </NavItem>
        </Nav>
        <StaticModal show={this.state.lgShow} onHide={lgClose} subheading={this.state.subheading} title={this.state.title} body={this.state.body}/>
      </Navbar>
    );
  }
} 

export default createContainer(() => {

  Meteor.subscribe('configurations');
  return {
    configurations: Configurations.find({}).fetch().map((configuration) => {
      return {
        ...configuration
      };
    })
  };
}, Header);