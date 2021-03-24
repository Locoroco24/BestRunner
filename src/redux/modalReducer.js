import {CLOSE_MODAL, OPEN_MODAL} from "./types";

const initialState = {
    isOpen: false
}

export function modalReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return { ...state, isOpen: action.payload}
        case CLOSE_MODAL:
            return { ...state, isOpen: action.payload}
        default: return state
    }
}