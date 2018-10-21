import React, { Component } from "react";
import Stats from './Stats';
class Step5 extends Component{

    render(){
        return  (<div className="step step1">
                        <p>Step 5</p>                
                        <Stats {...this.props} />
        </div>);
    }
    

}

export default Step5;