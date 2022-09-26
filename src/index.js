import React from 'react'
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import allReducers from './reducers'
import App from './App';
import { configureStore } from '@reduxjs/toolkit'
import './index.css';


const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
