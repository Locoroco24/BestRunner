import {ADD_WORKOUT, DELETE_WORKOUT, EDIT_WORKOUT, FILTER_WORKOUTS} from './types'
import {workoutStore} from '../index'

export function addWorkout(workout) {
    return workoutStore.dispatch({
        type: ADD_WORKOUT,
        payload:  workout
    });
    // return async dispatch => {
    //     const response = await fetch("/api/users", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json; charset=utf-8"
    //         },
    //         body: JSON.stringify(workout)
    //     });
    //
    //     const json = await response.json();
    //     dispatch({type: ADD_WORKOUT, payload: json});
}

export function deleteWorkout(workout) {
    return workoutStore.dispatch({
        type: DELETE_WORKOUT,
        payload:  workout
    });
}

export function editWorkout(workout) {
    return workoutStore.dispatch({
        type: EDIT_WORKOUT,
        payload:  workout
    });
}

export function filterWorkouts(event) {
    return workoutStore.dispatch({
        type: FILTER_WORKOUTS,
        payload:  event
    });
}
