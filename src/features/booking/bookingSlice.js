import produce from "immer";
import { actionTypes } from "./action";

const initialState = {
  movies: null,
  selectedMovie: null,
  cinemas: null,
  schedules: null,
};

//shallow
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MOVIES:{
      // state.movies = action.payload;
      return produce(state, (draft) => {
        draft.movies = action.payload;
      });
    }


    case actionTypes.SET_MOVIES_DETAIL:{
      return produce(state, (draft) => {
        draft.selectedMovie = action.payload;
      });
    }

    case actionTypes.SET_CINEMAS:{
      return produce(state, (draft) => {
        draft.cinemas = action.payload;
      });
    }

    case actionTypes.SET_SCHEDULES:{
      return produce(state, (draft) => {
        draft.schedules = action.payload[0];
      });
    }


    default:
      return state;
  }
};

export default reducer;
