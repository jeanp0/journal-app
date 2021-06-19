import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const handleSaveClick = () => {
    dispatch(startSaveNote(active));
  };
  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    dispatch(startUploading(file));
  };

  return (
    <div className="notes__appbar">
      <span>5 de junio de 2021</span>

      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div>
        <button className="btn" type="file" onClick={handlePictureClick}>
          Picture
        </button>
        <button className="btn" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};
