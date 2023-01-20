import { props, createActionGroup, emptyProps } from "@ngrx/store";
import { Project } from "../../types";

const COMPONENT = "PROJECT";

export const ProjectActions = createActionGroup({
    source: COMPONENT,
    events: {
        GET_ALL: emptyProps(),
        CREATE: props<Project>(),
        UPDATE: props<Project>(),
        DELETE: props<{projectId: string}>(),
        GET_ALL_SUCCESS: props<{projects: Project[]}>(),
        CREATE_SUCCESS: emptyProps(),
        UPDATE_SUCCESS: emptyProps(),
        DELETE_SUCCESS: emptyProps(),
        GET_ALL_FAILED: emptyProps(),
        CREATE_FAILED: emptyProps(),
        UPDATE_FAILED: emptyProps(),
        DELETE_FAILED: emptyProps()
    }
});


