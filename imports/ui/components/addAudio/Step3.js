import React, { Component } from "react";
import Stats from './Stats';
class Step3 extends Component{

    render(){
        return  <div className="step step1">
                        <p>Step 3</p>                
                        <Stats {...this.props} />
                </div>;
    }

}

export default Step3;