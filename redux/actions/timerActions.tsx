import {TICK} from '../types';

// INITIALIZES CLOCK ON SERVER
export const serverRenderClock = () => (dispatch:any) =>{
    dispatch({
        type: TICK,
        payload: { light: false, ts: Date.now() },
    })
}

// INITIALIZES CLOCK ON CLIENT
export const startClock = () => (dispatch) => {
    setInterval(() => {
        dispatch({ type: TICK, payload: { light: true, ts: Date.now() } })
    }, 1000)
}