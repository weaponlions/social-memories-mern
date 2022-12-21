import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App'; 
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore, compose } from 'redux';
import thunk from 'redux-thunk'
import reducers from './Redux/reducers';
  
const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render( <Provider store={store} > <App /> </Provider> , document.getElementById('root'))
