import React from 'react';
import GoogleMapComponent from '../components/GoogleMapComponent';
import Header from './Header';

export default class AddAudio extends React.Component{

    componentDidMount(nextState){
        const lastRoute = nextState.routes[nextState.routes.length - 1];
        Session.set('currentPagePrivacy', lastRoute.privacy);
    }

    componentDidMount(nextState){
        Session.set('currentPagePrivacy', "unauth");
    }
   
   render(){
    return <div>  
                <Header title="Strathy Unit"/>
                <GoogleMapComponent addAudio="true"/>
            </div>;
   } 
};