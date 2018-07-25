import * as actions from './actions'

export default function reducer(state = { play: false, currentTime: 0, duration: 0 }, action) {
  switch (action.type) {
    case actions.TOGGLE_PLAY:
      return { ...state, play: !state.play };

    case actions.SET_CURRENT_TIME:
      const { currentTime } = action.payload;
      return { ...state, currentTime};

    case actions.SET_DURATION:
      const { duration } = action.payload;
      return { ...state, duration};
      
    default:
      return state;
  }
}