import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // App 컴포넌트 import
import reportWebVitals from './reportWebVitals';

ReactDOM.render( //React DOM이 내부의 컴포넌트들을 'root' 엘리멘트에 render함.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
