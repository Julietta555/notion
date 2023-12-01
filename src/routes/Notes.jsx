import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../components/UserContextProvider';
import { Home } from './Home'

export function Notes() {
  const { user , notes, setNotes } = useContext(UserContext);

  const userNotes = notes.filter((note) => note.userId === user?.id);
  userNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    fetch('http://localhost:5001/notes')
      .then(res => res.json())
      .then(setNotes);
  }, []);

  const handleDeleteNote = (id) => {
    fetch(`http://localhost:5001/notes/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const updatedNotes= notes.filter(note => note.id !== id);
          setNotes(updatedNotes);
        }
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
        navigate('/error');
      });
  };

  return (
    <div className="text-center mt-5 flex flex-col items-center justify-center">
      <Home />
      <h1 className="text-3xl font-bold mt-8">Notes</h1>
      <button className="mt-4 mb-4 bg-gray-300 hover:bg-gray-500 py-2 px-4 rounded">
        <Link to="/notes/create">
          Add new note
        </Link>
      </button>

      {userNotes
      .map((note) => (
        <div key={note.id} className="mt-2 mb-2 flex items-center h-12 w-full bg-gray-300 p-3">
          <Link to={`/notes/${note.id}`} className="flex items-center w-full">
            <h2 className="flex justify-start text-xl font-bold w-full">{note.noteName}</h2>
            <h4 className="flex justify-start text-l">{note.createdAt}</h4>
          </Link>
          <Link to={`/notes/edit/${note.id}`} className="mr-4">
            &#9997;
          </Link>
          <button
            onClick={() => handleDeleteNote(note.id)}
            className="text-red-500 mr-4 hover:text-red-700"
          >
            &#128465;
          </button>
        </div>
      ))}
    </div>
  );
}
