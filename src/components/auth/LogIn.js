import React, { Component } from 'react';
import FormErrors from "../../pages/FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import {
  NavLink
} from '../../pages/NavbarElements';
import '../../login.css';


class LogIn extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    const {username,email,password} = this.state;
    try {
      const user =  await Auth.signIn(this.state.username, this.state.password);   
      
      console.log(user)   
      this.props.auth.setAuthStatus(true)
      this.props.auth.setUser(true)
      this.props.history.push("/")
    } catch (error) {
      let err = null;
      !error.message ? err = {"message " : error}: err = error
      this.setState({
        errors:{
          ...this.state.errors,
          cognito : error
        }
      })      
    }
  };
  

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <div id="card">
          <div id="card-content">
            <div id="card-title">
              <h2>INLOGGEN</h2>
            <FormErrors formerrors={this.state.errors} style={{ color: 'red' }}/>
            </div>
          <form onSubmit={this.handleSubmit} class="form">
              <label for="user-email" style={{paddingTop: "13px"}}>
              &nbsp;Gebruikersnaam
          </label>
            <input id="username" class="form-content" type="text" name="email" onChange={this.onInputChange}
              id="username"
              placeholder="Gebruikersnaam"
              value={this.state.username} autocomplete="on" required />
              <div class="form-border"></div>
            <label for="password" style={{ paddingTop: "22px" }}>&nbsp;Wachtwoord
          </label>
            <input class="form-content" type="password" name="password"
              id="password"
              placeholder="Wachtwoord"
              value={this.state.password}
              onChange={this.onInputChange} required />
              <div class="form-border"></div>
              <input id="submit-btn" type="submit" name="submit" value="INLOGGEN" />
            <NavLink to="register"> <span style={{ color: 'blue' }}>Heb je nog geen account?</span></NavLink>
            </form>
          </div>
        </div>
      
    );
  }
}

export default LogIn;