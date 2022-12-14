import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';;
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const initialState = {};

const middleware = [thunkMiddleware];

let store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;