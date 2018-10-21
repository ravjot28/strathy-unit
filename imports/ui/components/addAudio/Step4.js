import React, { Component } from "react";
import Stats from './Stats';
class Step4 extends Component{

    render(){
        return  <div className="step step1">
                        <p>Step 4</p>                
                        <Stats {...this.props} />
                </div>;
    }

}

export default Step4;