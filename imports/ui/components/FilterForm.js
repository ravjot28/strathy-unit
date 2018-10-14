import React from "react";
import {
  ControlLabel,
  Button,
  ToggleButtonGroup,
  FormControl,
  ToggleButton,
  FormGroup
} from "react-bootstrap";
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class FilterForm extends React.PureComponent {
  constructor(props){
    super(props);
    this.state= {
      minAge:20,
      maxAge:100
    }
  }

  handleChange(e){
    this.setState({minAge:e[0],maxAge:e[1]});
  }

  render() {
    const { style, onSubmit, ...props } = this.props;

    return (
      <form
        style={{
          backgroundColor: "rgba(255, 0, 0, 0.5)",
          width: "18vw",
          position: "fixed",
          top: "0",
          left: "0",
          padding: "0 20px 20px",
          ...style
        }}
        onSubmit={onSubmit}
        {...props}
      >
        <h3>Filters</h3>
        <FormGroup>
          <ControlLabel>Gender</ControlLabel>
          <ToggleButtonGroup
            style={{ padding: "0 5px" }}
            type="checkbox"
            name="gender"
          >
            <ToggleButton value="male">Male</ToggleButton>
            <ToggleButton value="female">Female</ToggleButton>
            <ToggleButton value="thirdGender">Third Gender</ToggleButton>
            <ToggleButton value="other">Other</ToggleButton>
          </ToggleButtonGroup>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Age Range: {this.state.minAge} - {this.state.maxAge}</ControlLabel>
          <Range min={0} max={120} defaultValue={[this.state.minAge, this.state.maxAge]} onChange={this.handleChange.bind(this)}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>English mother tongue?</ControlLabel>
          <ToggleButtonGroup
            type="checkbox"
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
            type="checkbox"
            style={{ padding: "0 5px" }}
            name="canada"
          >
            <ToggleButton value="1">Canada born orArrived Below 5 age</ToggleButton>
            <ToggleButton value="3">Arrived between 5 and 12</ToggleButton>
            <ToggleButton value="4">Arrived between 13 and 20</ToggleButton>
            <ToggleButton value="5">Arrived age 21 or older</ToggleButton>
            <ToggleButton value="6">I have never lived in Canada</ToggleButton>
          </ToggleButtonGroup>
        </FormGroup>
        <Button type="submit" bsStyle="primary">
          Apply
        </Button>
      </form>
    );
  }
}
