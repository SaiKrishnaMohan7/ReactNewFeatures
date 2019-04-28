import React, { useEffect, useReducer } from 'react';

import { getObject, setObject } from '../utils/localStorage';
import notesReducer from '../reducers/notesReducer';
import NotesList from './NotesList';
import NotesForm from './NotesForm';
import NotesContext from '../context/notesContext';
import useMousePosition from '../hooks/useMousePosition';

const NoteApp = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);
  const position = useMousePosition();

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

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <h1>Notes</h1>
      <p>Add Note {position.x}, {position.y}</p>
      <NotesList />
      <NotesForm />
    </NotesContext.Provider>
  );
};

export default NoteApp;