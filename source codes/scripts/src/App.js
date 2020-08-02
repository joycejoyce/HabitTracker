import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  state = {
    isAuthenticated: false,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user });
  }

  render() {
    const auth = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    };
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar auth={auth} />
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} auth={auth} />} />
              <Route exact path="/products" render={(props) => <Products {...props} auth={auth} />} />
              <Route exact path="/admin" render={(props) => <ProductAdmin {...props} auth={auth} />} />
              <Route exact path="/login" render={(props) => <LogIn {...props} auth={auth} />} />
              <Route exact path="/register" render={(props) => <Register {...props} auth={auth} />} />
              <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={auth} />} />
              <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={auth} />} />
              <Route exact path="/changepassword" render={(props) => <ChangePassword {...props} auth={auth} />} />
              <Route exact path="/changepasswordconfirmation" render={(props) => <ChangePasswordConfirm {...props} auth={auth} />} />
              <Route exact path="/welcome" render={(props) => <Welcome {...props} auth={auth} />} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;