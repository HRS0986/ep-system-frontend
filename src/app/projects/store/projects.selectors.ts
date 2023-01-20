import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectsState } from "./projects.state";

export const PROJECT_FEATURE_NAME = 'projects';

const getProjectState = createFeatureSelector<ProjectsState>(PROJECT_FEATURE_NAME);

export const projectsSelector = createSelector(getProjectState, state => state.projects);
