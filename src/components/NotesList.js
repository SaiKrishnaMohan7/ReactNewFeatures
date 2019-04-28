import React, { useContext } from 'react';

import Note from './Note';
import NotesContext from '../context/notesContext';

// This component doesn't use removeNote and only passes it down
const NotesList = () => {
  const { notes } = useContext(NotesContext);

  return (
        notes.map((note) => (
          <Note note={note} key={note.title}/>
        )
      )
    );
};

// export default NotesList;
export { NotesList as default };