import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js'; // Import CryptoJS

const encryptData = (data, secretKey) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encryptedData;
};

const decryptData = (encryptedData, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

const storedUser = localStorage.getItem('userInfo');

const userInfo = storedUser
  ? decryptData(storedUser, process.env.REACT_APP_ENCRYPT_KEY)
  : null;
console.log('Decrypted UserInfo:', userInfo);

const initialState = {
  userInfo: userInfo,


  accessToken: localStorage.getItem('accessToken')
    ? decryptData(localStorage.getItem('accessToken'), process.env.REACT_APP_ENCRYPT_KEY)
    : null,
  userId: localStorage.getItem('userId')
    ? decryptData(localStorage.getItem('userId'), process.env.REACT_APP_ENCRYPT_KEY)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;

      if (action.payload.login) {
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', encryptData(action.payload, process.env.REACT_APP_ENCRYPT_KEY));
      }
      localStorage.setItem('accessToken', encryptData(action.payload.accessToken, process.env.REACT_APP_ENCRYPT_KEY));
      localStorage.setItem('userId', encryptData(action.payload.userId, process.env.REACT_APP_ENCRYPT_KEY));
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userId');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
