import React, { Component } from 'react';
//import Navbar from './components/Navbar';
import Navbar from './pages/navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Download from './pages/download';
import Upload from './pages/upload';
import LogIn from './components/auth/LogIn'
import Register from './components/auth/Register'
import Welcome from './components/auth/Welcome'
import Auth from '@aws-amplify/auth';
import { withRouter } from 'react-router-dom';

/*
function App() {
  
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/upload'  component={Upload} />
        <Route path='/download' component={Download} />
        <Route path='/about' component={About} />
      </Switch>
    </Router>
  );
}*/

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }
  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }

  setUser = user => {
    this.setState({ user: user })
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true)
      console.log(session)
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user)

    } catch (error) {
      console.log(error)
    }
    this.setState({ isAuthenticating: false })
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }


    return (
      !this.state.isAuthenticating &&
      <div>
      <Router>
        <Navbar auth={authProps} />
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} auth={authProps} />} />
          <Route exact path="/upload" render={(props) => <Upload {...props} auth={authProps} />} />
          <Route exact path="/download" render={(props) => <Download {...props} auth={authProps} />} />
          <Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} />} />
          <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} />} />
          <Route exact path="/about" render={(props) => <About {...props} auth={authProps} />} />
          <Route exact path="/welcome" render={(props) => <Welcome {...props} auth={authProps} />} />
        </Switch>

      </Router>
      </div>
    );
  }
}

export default App;