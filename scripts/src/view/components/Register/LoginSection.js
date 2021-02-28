import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class LoginSection extends Component {
  goToLogin = () => {
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="loginSection">
        <div className="loginSection__text">Already have an account?</div>
        <div className="loginSection__login" onClick={this.goToLogin}>Login</div>
      </div>
    );
  }
}

//export default LoginSection;
const LoginSectionWithRouter = withRouter(LoginSection);
export default LoginSectionWithRouter;