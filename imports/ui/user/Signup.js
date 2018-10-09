import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Header from '../public/Header';


export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState({error: 'Password must be more than 8 characters long'});
    }

    this.props.createUser({email, password}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });
  }
  componentDidMount(nextState){
    Session.set('currentPagePrivacy', "unauth");
  }

  render() {
    return (
      <div>
        <Header title="Strathy Unit"/>
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Join</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
              <input type="email" ref="email" name="email" placeholder="Email"/>
              <input type="password" ref="password" name="password" placeholder="Password"/>
              <button className="button">Create Account</button>
            </form>

            <Link to="/admin">Have an account?</Link>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    createUser: Accounts.createUser
  };
}, Signup);