class User {
  static user = null;

  static set(user) {
    this.user = user;
  }
  
  static get() {
    return this.user;
  }

  static isLogin() {
    if(this.user != null) {
      return true;
    }
    else {
      return false;
    }
  }
}

export default User;