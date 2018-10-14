import React from "react";
import {
  ControlLabel,
  Button,
  ToggleButtonGroup,
  FormControl,
  ToggleButton,
  FormGroup
} from "react-bootstrap";

export default class FilterForm extends React.PureComponent {
  render() {
    const { style, onSubmit, ...props } = this.props;
    return (
      <form
        style={{
          backgroundColor: "white",
          width: "25vw",
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
            <ToggleButton value="2">Arrived between 5 and 12</ToggleButton>
            <ToggleButton value="3">Arrived between 13 and 20</ToggleButton>
            <ToggleButton value="4">Arrived age 21 or older</ToggleButton>
            <ToggleButton value="5">I have never lived in Canada</ToggleButton>
          </ToggleButtonGroup>
        </FormGroup>
        <Button type="submit" bsStyle="primary">
          Apply
        </Button>
      </form>
    );
  }
}
