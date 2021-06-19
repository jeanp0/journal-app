import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote, startDeleting } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { id, title, body } = formValues;
  const activeId = useRef(note.id);

  // console.log("Redux: ", note.id);
  // console.log("useRef: ", activeId.current);
  useEffect(() => {
    // only when note change
    if (note.id !== activeId.current) {
      // reset formValues with new state
      reset(note);
      // update id ref
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(setActiveNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleting(id));
  };

  return (
    <div className="notes__main-content" style={{ backgroundColor: "#fff" }}>
      <NotesAppBar />
      <div className="notes__content animate__animated animate__fadeIn animate__animated">
        <input
          type="text"
          name="title"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>
        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt="landscape" />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
