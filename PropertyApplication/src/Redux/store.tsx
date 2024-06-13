import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import likedPropertiesReducer from './likedPropertiesReducer';

const rootReducer = combineReducers({
  likedProperties: likedPropertiesReducer,
});

const store = createStore(rootReducer);

export default store;
