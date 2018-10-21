import React, { Component } from "react";
import Stats from './Stats';
class Step2 extends Component{

    render(){
        return  <div className="step step1">
                        <p>Step 2</p>                
                        <Stats {...this.props} />
                </div>;
    }

}

export default Step2;