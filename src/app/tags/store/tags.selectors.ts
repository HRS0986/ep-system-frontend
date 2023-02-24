import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TagsState } from "./tags.state";

export const TAGS_FEATURE_NAME = 'projects';

const getTagState = createFeatureSelector<TagsState>(TAGS_FEATURE_NAME);

export const tagsSelector = createSelector(getTagState, state => state.tags);
