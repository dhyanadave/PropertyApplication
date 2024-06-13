import { ADD_PROPERTY, REMOVE_PROPERTY } from './actions';

const initialState = [];

const likedPropertiesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_PROPERTY:
      return [...state, action.payload];
    case REMOVE_PROPERTY:
      return state.filter(property => property.id !== action.payload);
    default:
      return state;
  }
};

export default likedPropertiesReducer;
