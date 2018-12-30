import LOCALSTORAGE from '../constants/localstorage';
const fakeAuth = {
  isAuthenticated: JSON.parse(localStorage.getItem(LOCALSTORAGE.AUTH)) || false,
  login(token) {
    localStorage.setItem(LOCALSTORAGE.AUTH,true);
    this.isAuthenticated = JSON.parse(localStorage.getItem(LOCALSTORAGE.AUTH));
    localStorage.setItem(LOCALSTORAGE.TOKEN,token);
  },
  logOut() {
    localStorage.setItem(LOCALSTORAGE.AUTH,false);
    this.isAuthenticated = JSON.parse(localStorage.getItem(LOCALSTORAGE.AUTH));
    localStorage.removeItem(LOCALSTORAGE.TOKEN);
  }
};

export default fakeAuth;
