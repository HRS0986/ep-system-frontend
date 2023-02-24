import { Tag } from "../../types";

export interface TagsState {
  tags?: Tag[];
}

export const initialState: TagsState = {
  tags: undefined
}
