import Auth from '@aws-amplify/auth';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';


class Navbar extends Component {
  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      const user = await Auth.currentAuthenticatedUser();
      this.props.history.push('/upload');

    } catch (error) {

      this.props.history.push('/login');
    }
    this.setState({ isAuthenticating: false })
  }

    handleLogOut = async event =>{
    event.preventDefault();
    console.log("tet")
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      this.props.history.push('/login');
      
    } catch (error) {
      console.log(error.message)
      
    }
  }
  handleLogin = () => {
    this.props.history.push('/login');
  }
  render() {
    return (
      <Nav>        
          <img src="ap1.png" alt='logo' />
        <Bars />

        {this.props.auth.isAuthenticated ?
        <NavMenu>
          <NavLink to='/upload' activeStyle>
              Bestand uploaden
          </NavLink>
          <NavLink to='/download' activeStyle>
             Bestand downloaden
          </NavLink>
            <NavLink to='/about' activeStyle>
              Over ons
          </NavLink>

          
          </NavMenu> : null}
        <NavBtn>
          {this.props.auth.isAuthenticated ?
            <button className="navButton" onClick={this.handleLogOut}>Afmelden</button> :
            <button onClick={this.handleLogin} className="navButton">Aanmelden</button> }
        </NavBtn>
      </Nav>
      
    )
  }
}

export default withRouter(Navbar);
