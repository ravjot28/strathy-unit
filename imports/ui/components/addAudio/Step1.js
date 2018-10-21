import React, { Component } from "react";
import Stats from './Stats';
class Step1 extends Component{

    render(){
        return  <div className="step step1">
                        <p>Step 1</p>                
                        <Stats {...this.props} />
                </div>;
    }

}

export default Step1;