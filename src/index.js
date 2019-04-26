import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import { getObject, setObject } from './utils/localStorage';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // Do something when state/props chnage when no array provided
  // If empty array provided do something once
  // if array provided, then do something only if those props change
  useEffect(() => {
    console.log('cdm');
    const notesCached = getObject('notes');

    if (notesCached) {
      setNotes(notesCached);
    }
  }, []);

  useEffect(() => {
    console.log('notes Changed');
    setObject('notes', notes);
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    setNotes([...notes, { title, body }]);

    // reset the fields
    setTitle('');
    setBody('');
  };

  const removeNote = (title) => {
    return setNotes(notes.filter((note) => (note.title !== title)));
  };

  return (
    <div>
      <h1>Notes</h1>
      <p>Add Note</p>
      { notes.map((note) => (<Note note={note} removeNote={removeNote} key={note.title}/>))}
      <form onSubmit={addNote}>
        <input value={title} onChange={(e) => (setTitle(e.target.value))}/>
        <textarea value={body} onChange={(e) => (setBody(e.target.value))} />
        <button>add note</button>
      </form>
    </div>
  );
};

const Note = ({ note, removeNote }) => (
  <div>
    <h3>{note.title}</h3>
    <p>{note.body}</p>
    <button onClick={() => (removeNote(note.title))}>x</button>
  </div>
);

ReactDOM.render(<NoteApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
