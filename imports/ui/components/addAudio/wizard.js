import React, { Component } from 'react';
import StepWizard from 'react-step-wizard';

import Nav from './nav';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Stats from './Stats';
/**
 * A basic demonstration of how to use the step wizard
 */
export default class Wizard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {},
        };
    }

    updateForm = (key, value) => {
        const { form } = this.state;

        form[key] = value;
        this.setState({ form });
    }

    onStepChange = (stats) => {
        // console.log({ stats });
    }

    render() {
        return (
            <div className='container'>
                <h3>React Step Wizard</h3>

                <div >
                    <div className='row'>
                        <div className='col-12 col-sm-6 offset-sm-3'>
                            <StepWizard
                                onStepChange={this.onStepChange}
                                isHashEnabled
                                nav={<Nav />}
                            >
                                <Step1 hashKey={'FirstStep'} update={this.updateForm} />
                                <Step2/>
                                <Step3 />
                                <Step4 />
                                <Step5 hashKey={'TheEnd!'} />
                            </StepWizard>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



/** Steps */

class First extends Component {
    update = (e) => {
        this.props.update(e.target.name, e.target.value);
    }

    render() {
        if (!this.props.isActive) return null;

        return (
            <div>
                <h3 className='text-center'>Welcome! Have a look around!</h3>

                <label>First Name</label>
                <input type='text' className='form-control' name='firstname' placeholder='First Name'
                    onChange={this.update} />
                <Stats {...this.props} />
            </div>
        );
    }
}

class Second extends Component {
    validate = () => {
        if (confirm('Are you sure you want to go back?')) { // eslint-disable-line
            this.props.previousStep();
        }
    }

    render() {
        return (
            <div>
                { this.props.form.firstname && <h3>Hey {this.props.form.firstname}! 👋</h3> }
                I've added validation to the previous button.
                <Stats {...this.props} previousStep={this.validate} />
            </div>
        );
    }
}

const Progress = (props) => {
    let isActiveClass = '';

    if (props.isActive) {
        isActiveClass = "loaded";

        setTimeout(() => {
            props.nextStep();
        }, 5000);
    }

    return (
        <div className="progress-wrapper">
            <p className='text-center'>Automated Progress...</p>
            <div className={`progress ${isActiveClass}`}>
                <div className="progress-bar progress-bar-striped" />
            </div>
        </div>
    );
};

class Last extends Component {
    submit = () => {
        alert('You did it! Yay!') // eslint-disable-line
    }

    render() {
        return (
            <div>
                <div className={'text-center'}>
                    <h3>This is the last step in this example!</h3>
                    <hr />
                    <h4>Do you love it? Star it! 🤩</h4>
                    <iframe
                        src="https://ghbtns.com/github-btn.html?user=jcmcneal&repo=react-step-wizard&type=star&count=true&size=large"
                        frameBorder="0" scrolling="0" width="160px" height="30px"
                    />
                </div>
                <Stats {...this.props} nextStep={this.submit.bind(this)} />
            </div>
        );
    }
}