import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const render = Component => {
    ReactDOM.render(
      <Component />,
      document.getElementById('root'),
    )
  }
  
  render(App)
  

registerServiceWorker();
