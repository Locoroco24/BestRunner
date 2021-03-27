import {ADD_WORKOUT, DELETE_WORKOUT, EDIT_WORKOUT, FILTER_WORKOUTS} from './types';

async function workouts() {
    const response = await fetch('/api/workouts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
    return await response.json();
}

export const initialState = {
    workouts: [],
    filterType: 'Без фильтра'
};

(async() => {
    const result = await workouts();
    initialState.workouts = result
})();

export const workoutsReducer = (state = initialState, action) => {
    switch (action.type) {
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

const addWorkout = (state, workout) => {
    return {...state, workouts: [...state.workouts, workout]};
};

const deleteWorkout = (state, workout ) => {
    const index =  state.workouts.findIndex(item => item.key === workout.key);
    console.log(index)
    state.workouts.splice(index, 1);
    return {...state, workouts: [...state.workouts]};
};

const editWorkout = (state, { key, type, date, distance, description }) => {
    const index = state.workouts.findIndex(item => item.key === key);
    state.workouts[index] = {
        type,
        date,
        distance,
        description,
        key
    };
    return {...state, workouts: [...state.workouts]};
};

const filterWorkouts = (state, event) => {
    state.filterType = event.target.value;
    return {...state, filterType: state.filterType};
};

