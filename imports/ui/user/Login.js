import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Header from '../public/Header';


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  componentDidMount(nextState){
    Session.set('currentPagePrivacy', "unauth");
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    this.props.loginWithPassword({email}, password, (err) => {
      if (err) {
        console.log(err);
        this.setState({error: 'Unable to login. Check email and password.'});
      } else {
        this.setState({error: ''});
      }
    });
  }
  render() {
    return (
      <div>
        <Header title="Strathy Unit"/>
        <div className="boxed-view">
          <div className="boxed-view__box">
              <h1>Login</h1>

              {this.state.error ? <p>{this.state.error}</p> : undefined}

              <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                <input type="email" ref="email" name="email" placeholder="Email"/>
                <input type="password" ref="password" name="password" placeholder="Password"/>
                <button className="button">Login</button>
              </form>

              <Link to="/signup">Need an account?</Link>
            </div>
          </div>
      </div>
      
    );
  }
}

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  };
}, Login);