import { types } from "../components/types/types";

/*
 {
   notes: [],
   active: {
     id: string,
     title: string,
     body: string,
     imageUrl: string,
     date: number
   } | null
 }
*/
const initialState = { entries: [], active: null };

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesSetActive:
      return { ...state, active: { ...action.payload } };
    case types.notesCreate:
      return { ...state, entries: [action.payload, ...state.entries] };
    case types.notesLoad:
      return { ...state, entries: [...action.payload] };
    case types.notesUpdate:
      return {
        ...state,
        entries: state.entries.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };
    case types.notesDelete:
      return {
        ...state,
        active: null,
        entries: state.entries.filter((entry) => entry.id !== action.payload),
      };
    case types.notesLogoutAndClean:
      return initialState;
    default:
      return state;
  }
};
