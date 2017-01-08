import { combineReducers } from 'redux';

const combiner = combineReducers({
  placeholder: function(state = {}, action) {
    switch(action.type) {
      default:
        return state;
    }
  }
})

export default combiner;
