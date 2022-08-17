import {TICK} from '../types';

// INITIAL TIMER STATE
const initialTimerState = {
    lastUpdate: 0,
    light: false,
  }
  
  // TIMER REDUCER
const timerReducer = (state = initialTimerState, { type, payload }) => {
    switch (type) {
        case TICK:
            return {
                lastUpdate: payload.ts,
                light: !!payload.light,
            };
        default:
        return state
    }
}

export default timerReducer;