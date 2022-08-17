import {INCREMENT, DECREMENT, RESET} from '../types';


const initialState = {
    count: 0
}

const counterReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case INCREMENT:
        return {
            ...state,
            count: state.count + 1
        }
      case DECREMENT:
        return {
            ...state,
            count: state.count - 1
        }
      case RESET:
        return {
            ...state,
            count: 0
        }
      default:
        return state
    }
  }

export default counterReducer;
/*
action can be decoupled with {}, the object has the keys given in dispatch({type:... , payload:... etc})
export default function(state = initialState, action:any){
    switch(action.type){
        case SET_UNAPPROVED_USERS: return {
            ...state,
            unapprovedUsers: action.payload
        }

        default: return state;
    }
}
*/