export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const SKIP_AHEAD = 'SKIP_AHEAD';
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME';

export default function reducer(state = { play: false, currentTime: 0, duration: 0 }, action) {
  switch (action.type) {
    case TOGGLE_PLAY:
      return { ...state, play: !state.play };
    case SKIP_AHEAD:
      return { ...state, currentTime: state.currentTime + 20 };
    case SET_CURRENT_TIME:
      const { currentTime, duration } = action.payload;
      return { ...state, currentTime, duration }
    default:
      return state;
  }
}

export function togglePlay() {
  return {
    type: TOGGLE_PLAY
  };
}

export function skipAhead() {
  return {
    type: SKIP_AHEAD
  };
}

export function setCurrentTime(currentTime, duration) {
  return {
    type: SET_CURRENT_TIME,
    payload: {
      currentTime,
      duration
    }
  } 
}