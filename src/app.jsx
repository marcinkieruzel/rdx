import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import axios from 'axios';
import { Provider, connect } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware'
import './scss/main.scss';

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      state = {
        ...state,
        name: action.payload
      };
      break;
    case "E":
      throw new Error("Shity hell");
      break;
  }
  return state;
}

const langsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_USER":
      state = [
        ...state,
        action.payload
      ];
      break;
    case "DATA_FULFILLED":
    console.log(action.payload);
    state = [...state, ...action.payload.data.holidays]
    break;
  }
  return state;
}

const logger = (store) => (next) => (action) => {
  console.log("Action fired", action);
  next(action);
}

const error = (store) => (next) => (action) => {
  try {
    console.log("Działam");
    next(action)
  } catch (e) {
    console.log("Yahh", e);
  }
}

const middlaware = applyMiddleware(promiseMiddleware(), ReduxThunk, createLogger(), logger, error)

const reducers = combineReducers({users: usersReducer, langs: langsReducer})

const store = createStore(reducers, {}, middlaware);

store.subscribe(() => {
  console.log("State", store.getState());
})

store.dispatch({
  type: "DATA",
  payload: axios.get('https://holidayapi.com/v1/holidays?key=bcff6a00-2e9d-45ca-82f6-d537c862633a&country=HR&year=2016&pretty=true&month=12')
})

// const reducer = function(state, action){
//
//   if(action.type == "INC")
//   {
//     return state + action.payload;
//   } else if(action.type == "DEC")
//   {
//     return state - action.payload;
//   }
//   return state;
// }
//
// const store = createStore(reducer, 0);
//
//
// store.subscribe(() => {
//   console.log("State", store.getState());
// })
//
// store.dispatch({
//   type: "INC",
//   payload: 1
// })
// store.dispatch({
//   type: "INC",
//   payload: 1
// })
// store.dispatch({
//   type: "INC",
//   payload: 1
// })
// store.dispatch({
//   type: "DEC",
//   payload: 10
// })
@connect((store) => {
  return {
    langs: store.langs
  }
})
class App extends React.Component {
  render() {
    return (<div>Ok</div>)
  }
}
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));
});
