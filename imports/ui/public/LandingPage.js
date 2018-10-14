import React from "react";
import GoogleMapComponent from "../components/GoogleMapComponent";
import Header from "./Header";
import FilterForm from "../components/FilterForm";
import Draggable from "react-draggable";

export default class LandingPage extends React.Component {
  componentDidMount(nextState) {
    const lastRoute = nextState.routes[nextState.routes.length - 1];
    Session.set("currentPagePrivacy", lastRoute.privacy);
  }

  componentDidMount(nextState) {
    Session.set("currentPagePrivacy", "unauth");
  }

  render() {
    return (
      <div>
        <Header title="Strathy Unit" />
        <GoogleMapComponent />
        <Draggable defaultPosition={{ x: 0, y: 200 }}>
          <FilterForm onSubmit={this.handleFormSubmit} />
        </Draggable>
      </div>
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
