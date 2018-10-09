import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import StaticModal from '../components/StaticModal';
import { LinkContainer } from 'react-router-bootstrap';
import {Link} from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Configurations } from '../../api/configurations';

class Header extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.state = {
      lgShow: false,
      faqTitle: 'FAQ',
      faqBody: 'How do I make a recording? To record and submit your voice, click on the "Add Audio" tab and follow the prompts. Please note that this feature only works when using Chrome as your Browser. How do I listen to a recording? To listen to a recording, click on a marker, choose the work you want to hear and please "play".',
      aboutTitle: 'About',
      aboutBody: 'How do I make a recording? To record and submit your voice, click on the "Add Audio" tab and follow the prompts. Please note that this feature only works when using Chrome as your Browser. How do I listen to a recording? To listen to a recording, click on a marker, choose the work you want to hear and please "play".',
      downloadAudioTitle: 'Download Audio',
      downloadAudioBody: 'How do I make a recording? To record and submit your voice, click on the "Add Audio" tab and follow the prompts. Please note that this feature only works when using Chrome as your Browser. How do I listen to a recording? To listen to a recording, click on a marker, choose the work you want to hear and please "play".'
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
        </Nav>
        <Nav pullRight>
        <LinkContainer to="/admin">
          <NavItem eventKey={2}>Admin</NavItem>
        </LinkContainer>
        
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