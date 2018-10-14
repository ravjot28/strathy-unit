import React from "react";
import {
  Navbar,
  Nav,
  NavItem,
  ControlLabel,
  Button,
  ToggleButtonGroup,
  FormControl,
  ToggleButton,
  NavDropdown,
  InputGroup
} from "react-bootstrap";
import StaticModal from "../components/StaticModal";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { createContainer } from "meteor/react-meteor-data";
import { Configurations } from "../../api/configurations";
import { FormGroup } from "react-bootstrap";

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lgShow: false,
      myData: [{ value: "One", selected: true }, { value: "Two" }]
    };
  }

  render() {
    let lgClose = () => this.setState({ lgShow: false });

    let aboutConfig = undefined;
    let faqConfig = undefined;
    let downloadAudioConfig = undefined;
    this.props.configurations.forEach(configuration => {
      if (configuration.key === "FAQ") {
        faqConfig = configuration;
      } else if (configuration.key === "About") {
        aboutConfig = configuration;
      } else if (configuration.key === "Download Audio") {
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
        <Nav>
          {aboutConfig ? (
            <LinkContainer to="#">
              <NavItem
                eventKey={1}
                onClick={() =>
                  this.setState({
                    lgShow: true,
                    title: aboutConfig.key,
                    body: aboutConfig.value
                  })
                }
              >
                {aboutConfig.key}
              </NavItem>
            </LinkContainer>
          ) : (
            undefined
          )}
          <LinkContainer to="/addAudio">
            <NavItem eventKey={2}>Add Audio</NavItem>
          </LinkContainer>
          {downloadAudioConfig ? (
            <LinkContainer to="#">
              <NavItem
                eventKey={2}
                onClick={() =>
                  this.setState({
                    lgShow: true,
                    title: downloadAudioConfig.key,
                    body: downloadAudioConfig.value
                  })
                }
              >
                {downloadAudioConfig.key}
              </NavItem>
            </LinkContainer>
          ) : (
            undefined
          )}
          {faqConfig ? (
            <LinkContainer to="#">
              <NavItem
                eventKey={2}
                onClick={() =>
                  this.setState({
                    lgShow: true,
                    title: faqConfig.key,
                    body: faqConfig.value
                  })
                }
              >
                {faqConfig.key}
              </NavItem>
            </LinkContainer>
          ) : (
            undefined
          )}

          <LinkContainer to="/admin">
            <NavItem eventKey={2}>Admin</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <NavDropdown title="Filters" id="filters">
            <form
              style={{
                padding: "20px"
              }}
              onSubmit={this.handleFormSubmit}
            >
              <FormGroup>
                <ControlLabel>Gender</ControlLabel>
                <ToggleButtonGroup
                  style={{ padding: "0 5px" }}
                  type="radio"
                  name="gender"
                >
                  <ToggleButton value="m">Male</ToggleButton>
                  <ToggleButton value="f">Female</ToggleButton>
                </ToggleButtonGroup>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Minimum age</ControlLabel>
                <FormControl
                  defaultValue={20}
                  name="minimum_age"
                  componentClass="select"
                  placeholder="Minimum age"
                >
                  {Array(100)
                    .fill(0)
                    .map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Maximum age</ControlLabel>
                <FormControl
                  name="maximum_age"
                  componentClass="select"
                  defaultValue={40}
                  placeholder="Maximum age"
                >
                  {Array(100)
                    .fill(0)
                    .map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>English mother tongue?</ControlLabel>
                <ToggleButtonGroup
                  type="radio"
                  style={{ padding: "0 5px" }}
                  name="english"
                >
                  <ToggleButton value="yes">Yes</ToggleButton>
                  <ToggleButton value="no">No</ToggleButton>
                </ToggleButtonGroup>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Time in Canada</ControlLabel>
                <ToggleButtonGroup
                  type="radio"
                  style={{ padding: "0 5px" }}
                  name="canada"
                >
                  <ToggleButton value="1">
                    Born in Canada or arrived before age 5
                  </ToggleButton>
                  <ToggleButton value="2">
                    Arrived between 5 and 12
                  </ToggleButton>
                  <ToggleButton value="3">
                    Arrived between 13 and 20
                  </ToggleButton>
                  <ToggleButton value="4">Arrived age 21 or older</ToggleButton>
                  <ToggleButton value="5">
                    I have never lived in Canada
                  </ToggleButton>
                </ToggleButtonGroup>
              </FormGroup>
              <Button type="submit" bsStyle="primary">
                Apply
              </Button>
            </form>
          </NavDropdown>
        </Nav>
        <StaticModal
          show={this.state.lgShow}
          onHide={lgClose}
          subheading={this.state.subheading}
          title={this.state.title}
          body={this.state.body}
        />
      </Navbar>
    );
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const {
      gender,
      maximum_age,
      minimum_age,
      english,
      canada
    } = e.currentTarget;

    alert(
      JSON.stringify(
        {
          gender: gender.value,
          maximum_age: maximum_age.value,
          minimum_age: minimum_age.value,
          canada: canada.value,
          english: english.value
        },
        null,
        2
      )
    );
  };
}

export default createContainer(() => {
  Meteor.subscribe("configurations");
  return {
    configurations: Configurations.find({})
      .fetch()
      .map(configuration => {
        return {
          ...configuration
        };
      })
  };
}, Header);
