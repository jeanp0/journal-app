import { db } from "../firebase/firebase.config";

export const loadNotes = async (uid) => {
  const notesSnap = await db.collection(`/${uid}/journal/notes`).get();
  const notes = [];

  notesSnap.forEach((childrenSnap) => {
    notes.push({ id: childrenSnap.id, ...childrenSnap.data() });
  });

  return notes;
};
