import {ADD_WORKOUT, DELETE_WORKOUT, EDIT_WORKOUT, FILTER_WORKOUTS, GET_WORKOUTS} from './types';
import {workoutStore} from '../index';

export function getWorkouts() {
    async function f() {
        const response = await fetch('/api/workouts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        const result = await response.json();

        return workoutStore.dispatch({
            type: GET_WORKOUTS,
            payload: result
        });
    }
    return f();
}

export function addWorkout(workout) {
    async function f() {
        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(workout)
        });
        const result = await response.json();

        return workoutStore.dispatch({
            type: ADD_WORKOUT,
            payload: result
        });
    }
    return f();
}

export function deleteWorkout(key) {
    async function f() {
        const response = await fetch('/api/workouts/' + key, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        });
        const result = await response.json();

        return workoutStore.dispatch({
            type: DELETE_WORKOUT,
            payload:  result
        });
    }
    return f();
}

export function editWorkout(workout) {
    async function f() {
        const response = await fetch('/api/workouts', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(workout)
        });
        const result = await response.json();

        return workoutStore.dispatch({
            type: EDIT_WORKOUT,
            payload:  result
        });
    }
    return f();
}

export function filterWorkouts(event) {
    return workoutStore.dispatch({
        type: FILTER_WORKOUTS,
        payload:  event
    });
}
