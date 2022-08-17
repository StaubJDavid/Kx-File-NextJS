import {combineReducers} from 'redux';
import timerReducer from './timerReducer';
import counterReducer from './counterReducer';

const reducers = {
    counter: counterReducer,
    timer: timerReducer,
}

export default combineReducers(reducers)