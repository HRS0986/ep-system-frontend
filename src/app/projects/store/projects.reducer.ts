import { createReducer, on } from "@ngrx/store";
import { initialState, ProjectsState } from "./projects.state";
import { ProjectActions } from "./projects.actions";


export const projectsReducer = createReducer(
    initialState,
    on(ProjectActions.get_all_success, (state: ProjectsState, data) => {
      debugger;
        return {
            ...state,
            projects: data.projects
        };
    }),
);
