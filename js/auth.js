import {
  AsyncStorage
} from 'react-native';

const ROOT_URL = `http://localhost:1337/parse`;
const HEADERS = {
  'X-Parse-Application-Id': 'StudentWGPlanner',
  'X-Parse-Master-Key': 'asdf'
};

export default {
  register(username, password, password2, email) {
    if (!username || !password || !email) {
      return false;
    }
    if (password !== password2) {
      return false;
    }

    return fetch(`${ROOT_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...HEADERS
        },
        body: JSON.stringify({ username, password, email })
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

module.exports = {
  USERID: '',
  WGID: '',
  WGNAME: ''
};

/*
module.exports = {
  login(name, password, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }
    if (!name || !password) {
      if (cb) cb(false);
      this.onChange(false);
      return;
    }
    axios.post(`${ROOT_URL}/user/signin`, { name, password })
      .then((res) => {
        localStorage.token = res.data.token;
        localStorage.username = res.data.name;
        if (cb) cb(true);
        this.onChange(true);
      })
      .catch((res) => {
        if (cb) cb(false);
        this.onChange(false);
      });
  },
  getToken() {
    return localStorage.token;
  },
  getUsername() {
    return localStorage.username;
  },
  logout(cb) {
    delete localStorage.token;
    delete localStorage.username;
    if (cb) cb();
    this.onChange(false);
  },
  loggedIn() {
    return !!localStorage.token;
  },
  onChange() {}
}
*/
