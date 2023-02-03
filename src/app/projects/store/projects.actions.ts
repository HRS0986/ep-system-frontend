import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Project } from "../../types";

const COMPONENT = "PROJECT";

export const ProjectActions = createActionGroup({
    source: COMPONENT,
    events: {
        GET_ALL: emptyProps(),
        GET_ALL_SUCCESS: props<{ projects?: Project[] }>(),
        GET_ALL_FAILED: props<{ error: string }>(),
    }
});


