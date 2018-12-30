import axios from 'axios';
import { API_BASE } from "../constants/API";
import LOCALSTORAGE from '../constants/localstorage';

class ItemsServiceClass {

  postLogin(username, password) {
    return axios.post(`${API_BASE}/users/sign_in`, { username, password })
      .then(function (response) {
        return response.data;
      })
      .catch(err => err.response.data);

  };

  postSignUp(firstName, lastName, username, email, password) {
    return axios.post(`${API_BASE}/users/sign_up`, { firstName, lastName, username, email, password })
      .then(function (response) {
        return response.data;
      })
      .catch(err => err.response.data);
  };

  getTodos(token = localStorage.getItem(LOCALSTORAGE.TOKEN)) {
    return axios.get(`${API_BASE}/todos`, { headers: { token } })
      .then(res => {
        console.log(res);
        return res.data;
      })
      .catch(err => console.log(err));
  };

  postItem(token = localStorage.getItem(LOCALSTORAGE.TOKEN), title, expires_at) {
    return axios.post(`${API_BASE}/todos`, { title, expires_at }, { headers: { token } })
      .then(function (response) {
        return response.data;
      })
      .catch(err => err.response.data);
  };

  putItem(token = localStorage.getItem(LOCALSTORAGE.TOKEN), id, completed, title, expires_at) {
    return axios.put(`${API_BASE}/todos/${id}`, { title, expires_at , completed }, { headers: { token } })
      .then(function (response) {
        return response.data;
      })
      .catch(err => err.response.data);
  };

  deleteItem(token = localStorage.getItem(LOCALSTORAGE.TOKEN),id) {
    return axios.delete(`${API_BASE}/todos/${id}`, { headers: { token } })
      .then(function (response) {
        return response.data;
      })
      .catch(err => err.response.data);
  };

  getItem(token = localStorage.getItem(LOCALSTORAGE.TOKEN),id) {
    return axios.get(`${API_BASE}/todos/${id}`, { headers: { token } })
      .then(function (response) {
        return response.data;
      })
      .catch(err => err.response.data);
  };
}

const ItemsService = new ItemsServiceClass();
export default ItemsService;