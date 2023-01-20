import { createReducer, on } from "@ngrx/store";
import { initialState } from "./projects.state";
import { getAll } from "./projects.actions";


export const projectsReducer = createReducer(
    initialState,
    on(getAll, (state) => {
        return {
            ...state
        };
    })
);
