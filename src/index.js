import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers/reducer'
import cartReducer from './reducers/cartReducer'

const reducers = combineReducers({
  prodred: reducer,
  cred: cartReducer
})

const store = createStore(reducers)

ReactDOM.render(
   <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);


