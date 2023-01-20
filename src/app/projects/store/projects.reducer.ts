import { createReducer, on } from "@ngrx/store";
import { initialState } from "./projects.state";
import { ProjectActions } from "./projects.actions";


export const projectsReducer = createReducer(
    initialState,
    on(ProjectActions.get_all_success, (state, data) => {
        return {
            ...state,
            projects: data.projects
        };
    })
);
