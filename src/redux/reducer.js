import {ADD_WORKOUT, DELETE_WORKOUT, EDIT_WORKOUT, FILTER_WORKOUTS} from './types';

export const initialState = {
    workouts: [],
    filterType: 'Без фильтра'
}

export const workoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WORKOUT:
            return addWorkout(state, action.payload)
        case DELETE_WORKOUT:
            return deleteWorkout(state, action.payload)
        case EDIT_WORKOUT:
            return editWorkout(state, action.payload)
        case FILTER_WORKOUTS:
            return filterWorkouts(state, action.payload)
        default: return state
    }
}

const addWorkout = (state, workout) => {
    workout.key = `${workout.type}_${Date.now()}`;
    return {...state, workouts: [...state.workouts, workout]}
}

const deleteWorkout = (state, key ) => {
    state.workouts.splice(state.workouts.findIndex(item => item.key === key), 1)
    return {...state, workouts: [...state.workouts]}
}

const editWorkout = (state, { key, type, date, distance, description }) => {
    const index = state.workouts.findIndex(item => item.key === key)
    state.workouts[index] = {
        type,
        date,
        distance,
        description,
        key
    }
    return {...state, workouts: [...state.workouts]}
}

const filterWorkouts = (state, event) => {
    state.filterType = event.target.value
    return {...state, filterType: state.filterType}
}

