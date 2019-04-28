import React, { useContext } from 'react';

import NotesContext from '../context/notesContext';

const Note = ({ note }) => {
  const { dispatch } = useContext(NotesContext);

  const removeNote = (title) => {
    dispatch({type: 'REMOVE_NOTE', title});
  };

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => (removeNote(note.title))}>x</button>
    </div>
  );
};

export default Note;