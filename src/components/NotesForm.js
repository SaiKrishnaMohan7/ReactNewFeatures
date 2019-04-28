import React, { Fragment, useState } from 'react';

// The NotesForm component needs to concern itslef with adding notes, keeping track of what's typed in titile and body
// hence addNote, title, body and the useSate calls have been moved here
const NotesForm = ({ dispatch }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNote = (e) => {
    e.preventDefault();

    dispatch({type: 'ADD_NOTE', title, body});

    // reset the fields
    setTitle('');
    setBody('');
  };

  return (
    <Fragment>
      <form onSubmit={addNote}>
        <input value={title} onChange={(e) => (setTitle(e.target.value))}/>
        <textarea value={body} onChange={(e) => (setBody(e.target.value))} />
        <button>add note</button>
      </form>
    </Fragment>
  )
};

export default NotesForm;