import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducer, createStore } from 'redux';

const usersReducer = (state = {}, actions)
{
  return state;
}
const langsReducer = (state = {}, actions)
{
  return state;
}

const reducers = combineReducer({
  users: usersReducer,
  langs: langsReducer
})
