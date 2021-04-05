import {ADD_WORKOUT, DELETE_WORKOUT, EDIT_WORKOUT, FILTER_WORKOUTS, GET_WORKOUTS} from './types';

export const initialState = {
    workouts: [],
    filterType: 'Без фильтра'
};

export const workoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WORKOUTS:
            return getWorkouts(state, action.payload);
        case ADD_WORKOUT:
            return addWorkout(state, action.payload);
        case DELETE_WORKOUT:
            return deleteWorkout(state, action.payload);
        case EDIT_WORKOUT:
            return editWorkout(state, action.payload);
        case FILTER_WORKOUTS:
            return filterWorkouts(state, action.payload);
        default: return state;
    }
};

const getWorkouts = (state, workouts) => {
    return {...state, workouts: workouts};
}

const addWorkout = (state, workout) => {
    return {...state, workouts: [...state.workouts, workout]};
};

const deleteWorkout = (state, workout ) => {
    const newState = state
    const index =  newState.workouts.findIndex(item => item.key === workout.key);
    newState.workouts.splice(index, 1);
    return {...newState, workouts: [...newState.workouts]};
};

const editWorkout = (state, { key, type, date, distance, description }) => {
    const newState = state
    const index = newState.workouts.findIndex(item => item.key === key);
    newState.workouts[index] = {
        type,
        date,
        distance,
        description,
        key
    };
    return {...newState, workouts: [...newState.workouts]};
};

const filterWorkouts = (state, event) => {
    const newState = state
    newState.filterType = event.target.value;
    return {...newState, filterType: newState.filterType};
};

