import {CLOSE_MODAL, OPEN_MODAL} from "./types";

const initialState = {
    modals: {}
}

export function modalReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                modals: action.payload
            }
        case CLOSE_MODAL:
            return {
                modals: action.payload
            }
        default: return state
    }
}