import {combineReducers} from 'redux';
import {modalReducer} from "./modalReducer";
import {workoutsReducer} from "./reducer";

export const rootReducer = combineReducers({
    modal: modalReducer,
    workouts: workoutsReducer
})