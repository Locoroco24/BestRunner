import {ADD_WORKOUT, DELETE_WORKOUT, EDIT_WORKOUT, FILTER_WORKOUT} from './types';

const defaultValues = JSON.parse(localStorage.getItem('workouts')) || []

const initialState = {
    workouts: defaultValues
}

export const workoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WORKOUT:
            return { ...state, workouts: action.payload}
        case DELETE_WORKOUT:
            return { ...state, workouts: action.payload}
        case EDIT_WORKOUT:
            return { ...state, workouts: action.payload}
        case FILTER_WORKOUT:
            return { ...state, workouts: action.payload}
        default: return state
    }
}