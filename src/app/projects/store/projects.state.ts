import { Project } from "../../types";

export interface ProjectsState {
    projects?: Project[];
}

export const initialState: ProjectsState = {
    projects : undefined
}
