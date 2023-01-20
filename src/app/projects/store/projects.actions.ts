import { createAction, props } from "@ngrx/store";
import { GET_ALL, CREATE, DELETE, UPDATE, SUCCESS, FAILED } from "../../app.actions";
import { Project } from "../../types";

const COMPONENT = "[PROJECT]";

export const getAll = createAction(`${COMPONENT} ${GET_ALL}`);
export const create = createAction(`${COMPONENT} ${CREATE}`, props<Project>());
export const remove = createAction(`${COMPONENT} ${DELETE}`, props<{id: string}>());
export const update = createAction(`${COMPONENT} ${UPDATE}`, props<Project>());

export const getAllSuccess = createAction(`${COMPONENT} ${GET_ALL} ${SUCCESS}`);
export const createSuccess = createAction(`${COMPONENT} ${CREATE} ${SUCCESS}`);
export const removeSuccess = createAction(`${COMPONENT} ${DELETE} ${SUCCESS}`);
export const updateSuccess = createAction(`${COMPONENT} ${UPDATE} ${SUCCESS}`);

export const getAllFailed = createAction(`${COMPONENT} ${GET_ALL} ${FAILED}`);
export const createFailed = createAction(`${COMPONENT} ${CREATE} ${FAILED}`);
export const removeFailed = createAction(`${COMPONENT} ${DELETE} ${FAILED}`);
export const updateFailed = createAction(`${COMPONENT} ${UPDATE} ${FAILED}`);
