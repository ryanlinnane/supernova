import { combineReducers } from 'redux';

const combiner = combineReducers({
  example: function(state = {}, action) {
    switch(action.type) {
      default:
        return state;
    }
  }
})

export default combiner;
