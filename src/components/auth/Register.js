import React, { Component } from 'react';
import FormErrors from "../../pages/FormErrors";
import Validate from "../utility/FormValidation";
import {Auth} from "aws-amplify";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  }

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
      const signUpResponse =  await Auth.signUp({
        username,
        password,
        attributes :{
          email:email
        }        
      });   
      console.log(signUpResponse)   
      this.props.history.push("/welcome")
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
  }

  render() {
    return (
      <>

        <FormErrors formerrors={this.state.errors} style={{ color: 'red' }} />
        <div id="card" style={{ height: "450px" }}>
          <div id="card-content">
            <div id="card-title">
              <h2>Registreren</h2>
            </div>
          <form onSubmit={this.handleSubmit}  class="form">
              <label for="username" style={{paddingTop: "13px"}}>
              &nbsp;Gebruikersnaam
          </label>
            <input class="form-content" type="text" name="email" onChange={this.onInputChange}
              id="username"
              placeholder="Gebruikersnaam"
              value={this.state.username} autocomplete="on" required />
              <label for="email" style={{ paddingTop: "13px" }}>
                &nbsp;E-mailadres
          </label>
              <input id="email" class="form-content" type="email" name="email"
                value={this.state.email}
                onChange={this.onInputChange}
                placeholder="E-mailadres"
                 autocomplete="on" required />
              <div class="form-border"></div>
          <label for="password" style={{ paddingTop: "22px" }}>&nbsp;Wachtwoord
          </label>
            <input class="form-content" type="password" name="password"
              id="password"
              placeholder="Wachtwoord"
              value={this.state.password}
                onChange={this.onInputChange} required />
              <label for="confirmpassword" style={{ paddingTop: "22px" }}>&nbsp;Wachtwoord Bevestigen
          </label>
              <input class="form-content" type="password" name="confirmpassword"
                id="confirmpassword"
                placeholder="Wachtwoord bevestigen"
                value={this.state.confirmpassword}
                onChange={this.onInputChange}
                onChange={this.onInputChange} required />
              <div class="form-border"></div>
              <input id="submit-btn" type="submit" name="submit" value="REGISTREER" />
            </form>
          </div>
        </div>

            
      </>
    );
  }
}

export default Register;