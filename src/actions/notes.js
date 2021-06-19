import Swal from "sweetalert2";
import { types } from "../components/types/types";
import { db } from "../firebase/firebase.config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";

export const startCreateNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(setActiveNote(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  };
};

export const setActiveNote = (id, note) => ({
  type: types.notesSetActive,
  payload: { id, ...note },
});

export const addNewNote = (id, note) => ({
  type: types.notesCreate,
  payload: { id, ...note },
});

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!note.url) delete note.url;
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    try {
      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
      Swal.fire("Saved", note.title, "success");
    } catch (err) {
      Swal.fire("Error", note.title, "error");
      // console.error(err);
    }
    dispatch(refreshNote(note.id, noteToFirestore));
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: { id, note: { ...note, id } },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const fileUrl = await fileUpload(file);
    Swal.close();
    activeNote.url = fileUrl;
    dispatch(startSaveNote(activeNote));
    console.log(fileUrl);
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    await db.doc(`${uid}/journal/notes/${id}`).delete();
    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const cleanNotesLogout = () => ({
  type: types.notesLogoutAndClean,
});
