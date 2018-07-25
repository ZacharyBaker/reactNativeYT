export const TOGGLE_PLAY 			= 'TOGGLE_PLAY';
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME';
export const SET_DURATION 		= 'SET_DURATION';

export function togglePlay() {
  return {
    type: TOGGLE_PLAY
  };
}

export function setCurrentTime(currentTime) {
  return {
    type: SET_CURRENT_TIME,
    payload: {
      currentTime
    }
  } 
}

export function setDuration(duration) {
	return {
		type: SET_DURATION,
		payload: {
			duration
		}
	}
}