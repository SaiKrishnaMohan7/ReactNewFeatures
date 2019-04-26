import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import { getObject, setObject } from './utils/localStorage';

// state is notes
const notesReducer = (state, action) => {
  switch(action.type) {
    case 'POPULATE_NOTES':
      return action.notes;

    case 'ADD_NOTE':
      return [...state, { title: action.title, body: action.body }];

    case 'REMOVE_NOTE':
      return state.filter(note => (note.title !== action.title));

    default:
      return state;
  }
};

const NoteApp = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

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

  const addNote = (e) => {
    e.preventDefault();

    dispatch({type: 'ADD_NOTE', title, body});

    // reset the fields
    setTitle('');
    setBody('');
  };

  const removeNote = (title) => {
    dispatch({type: 'REMOVE_NOTE', title});
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

const Note = ({ note, removeNote }) => {
  useEffect(() => {
    console.log('Setup effect');

    // componentDidUnmount
    // clean up fucntion
    return () => {
      console.log('Cleaning up Note effect!');
    };
  }, []);

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => (removeNote(note.title))}>x</button>
    </div>
  );
};

ReactDOM.render(<NoteApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
