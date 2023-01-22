import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Project } from "../../types";

const COMPONENT = "PROJECT";

export const ProjectActions = createActionGroup({
    source: COMPONENT,
    events: {
        GET_ALL: emptyProps(),
        CREATE: props<Project>(),
        UPDATE: props<Project>(),
        DELETE: props<{ projectId: string }>(),
        GET_ALL_SUCCESS: props<{ projects: Project[] }>(),
        CREATE_SUCCESS: emptyProps(),
        UPDATE_SUCCESS: emptyProps(),
        DELETE_SUCCESS: emptyProps(),
        GET_ALL_FAILED: props<{ error: string }>(),
        CREATE_FAILED: props<{ error: string }>(),
        UPDATE_FAILED: props<{ error: string }>(),
        DELETE_FAILED: props<{ error: string }>()
    }
});


