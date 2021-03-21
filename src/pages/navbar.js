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

  componentDidMount(){
    this.props.history.push('/login');
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
  render() {
    return (
      <Nav>
        <NavLink to='/'>
          <img src="AP_logo.jpg" alt='logo' height="30" width="50" />
        </NavLink>
        <Bars />

        {this.props.auth.isAuthenticated ?
        <NavMenu>
          <NavLink to='/upload' activeStyle>
              Upload
          </NavLink>
          <NavLink to='/download' activeStyle>
              Download File
          </NavLink>
            <NavLink to='/about' activeStyle>
              About
          </NavLink>

          
          </NavMenu> : null}
        <NavBtn>
          {this.props.auth.isAuthenticated ?
            <button className="navButton" onClick={this.handleLogOut}>Logout</button> :
            <NavBtnLink to='/login'>Sign In</NavBtnLink> }
        </NavBtn>
      </Nav>
      
    )
  }
}

export default withRouter(Navbar);
