import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  OverlayView
} from "react-google-maps";
import React, { Component } from "react";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import _ from "lodash";
import { compose, withProps } from "recompose";
import AddAudioForm from '../components/AddAudioForm';
import StaticModal from '../components/StaticModal';

class GoogleMapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleConfig: {
        defaultZoom: 4,
        locationFoundZoom: 17,
        defaultLocation: { lat: 61.6517271, lng: -93.355123 }
      },
      markers: [],
      bounds: null,
      locationFound: undefined,
      showAddAudio:false,
      title:'Add Audio'
    };
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState.locationFound) {
      return true;
    } else if (!this.state.locationFound) {
      this.setState({ locationFound: newProps.currentLocation });
    } else if (
      newProps &&
      newProps.currentLocation &&
      (newProps.currentLocation.lat !== this.state.locationFound.lat ||
        newProps.currentLocation.lng !== this.state.locationFound.lng)
    ) {
      this.setState({ locationFound: newProps.currentLocation });
    }
    return false;
  }

  onPlacesChanged() {
    const places = this.refs.searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    const nextMarkers = places.map(place => ({
      position: place.geometry.location,
      isOpen: false
    }));
    const nextCenter = _.get(nextMarkers, "0.position", this.state.center);

    const currentMarkers = [...this.state.markers].concat(nextMarkers);

    let zoomValue = 12;

    this.setState({
      locationFound: { lat: nextCenter.lat(), lng: nextCenter.lng() }
    });

    if(this.props.addAudio && this.props.addAudio === "true"){
      this.setState({showAddAudio:true});
    }
    // refs.map.fitBounds(bounds);
  }

  handleAddAudio(){
      this.setState({showAddAudio:!this.state.showAddAudio});
  }

  render() {
    let location = this.state.googleConfig.defaultLocation;
    let zoom = this.state.googleConfig.defaultZoom;

    if (this.state.locationFound) {
      location = this.state.locationFound;
      zoom = this.state.googleConfig.locationFoundZoom;
    }

    return (
      <GoogleMap
        zoom={zoom}
        center={location}
        defaultOptions={{
          mapTypeControl: false,
          streetViewControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          fullscreenControl: false,
          zoomControl: true,
          rotateControl: false,
          scrollwheel: false
        }}
      >
        <SearchBox
          ref="searchBox"
          bounds={this.state.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={this.onPlacesChanged.bind(this)}
        >
          <input
            type="text"
            placeholder="Enter Location"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `40px`,
              marginTop: `10px`,
              padding: `12px 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              cursor: `text`
            }}
          />
        </SearchBox>
        {this.props.isMarkerShown && (
          <Marker position={this.props.currentLocation} />
        )}
        <StaticModal show={this.state.showAddAudio} body={<AddAudioForm/>}
                onHide={this.handleAddAudio.bind(this)}
                subheading={this.state.subheading}
                title={this.state.title}/>
      </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA6Wl62GpxSMd-48oVq1PC7_L6vViE88Rg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `96.5vh`, width: `100vw` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(GoogleMapComponent);
