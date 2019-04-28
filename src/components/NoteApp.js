import React, { useEffect, useReducer } from 'react';

import { getObject, setObject } from '../utils/localStorage';
import notesReducer from '../reducers/notesReducer';
import NotesList from './NotesList';
import NotesForm from './NotesForm';

const NoteApp = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);

  // CDM
  useEffect(() => {
    const notesCached = getObject('notes');

    if (notesCached) {
      dispatch({type: 'POPULATE_NOTES', notes: notesCached})
    }
  }, []);

  // componentDidUpdate
  useEffect(() => {
    setObject('notes', notes);
  }, [notes]);

  const removeNote = (title) => {
    dispatch({type: 'REMOVE_NOTE', title});
  };

  return (
    <div>
      <h1>Notes</h1>
      <p>Add Note</p>
      <NotesList notes={notes} removeNote={removeNote} />
      <NotesForm dispatch={dispatch} />
    </div>
  );
};

export default NoteApp;