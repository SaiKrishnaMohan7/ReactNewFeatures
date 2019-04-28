import React from 'react';

import Note from './Note';

// This component doesn't use removeNote and only passes it down
const NotesList = ({ notes, removeNote }) => {
  return (
        notes.map((note) => (
          <Note note={note} removeNote={removeNote} key={note.title}/>
        )
      )
    );
};

// export default NotesList;
export { NotesList as default };