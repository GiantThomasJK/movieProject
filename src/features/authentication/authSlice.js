import { produce } from "immer";
import { SET_PROFILE } from "./action";

const initialState = {
  profile: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE: {
      return produce(state, (draft) => {
        draft.profile = action.payload;
      });
    }

    default:
      return state;
  }
};

export default reducer;
