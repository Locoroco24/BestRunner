import {OPEN_MODAL, CLOSE_MODAL, ADD_WORKOUT, DELETE_WORKOUT, EDIT_WORKOUT, FILTER_WORKOUT} from './types'
import {store} from '../index'

export function openModal(id) {
    return store.dispatch({
        type: OPEN_MODAL,
        payload: {
            [id]: true
        }
    })
}

export function closeModal(id) {
    return store.dispatch({
        type: CLOSE_MODAL,
        payload: {
            [id]: false
        }
    })
}

export function addWorkout(workout) {
    return store.dispatch({
        type: ADD_WORKOUT,
        payload:  workout
    })
}

export function deleteWorkout(workout) {
    return store.dispatch({
        type: DELETE_WORKOUT,
        payload:  workout
    })
}

export function editWorkout(workout) {
    return store.dispatch({
        type: EDIT_WORKOUT,
        payload:  workout
    })
}

export function filterWorkout(workouts) {
    return store.dispatch({
        type: FILTER_WORKOUT,
        payload:  workouts
    })
}
