class User {
  static user = null;

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