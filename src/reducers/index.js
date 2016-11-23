import { combineReducers } from 'redux';

const combiner = combineReducers({
  home: function(state = {imageSrc: './public/images/profile.png'}, action) {
    switch(action.type) {
      case "CHANGE_PIC":
        return Object.assign({}, {imageSrc: action.src});
      default:
        return state;
    }
  }
});

export default combiner;
