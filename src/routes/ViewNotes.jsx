import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/UserContextProvider';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Home } from './Home'

export function ViewNotes() {
  const { notes, setNotes } = useContext(UserContext);
  const [note, setNote] = useState(null);
  const [noteName, setName] = useState('');
  const [noteText, setText] = useState('');
  const navigate = useNavigate();

  const params = useParams();
  const noteId = params.id;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5001/notes/${noteId}`);
        if (response.ok) {
          const noteInfo = await response.json();
          setNote(noteInfo);
          setName(noteInfo.noteName);
          setText(noteInfo.noteText);
        } else {
          throw new Error('Failed to fetch note');
        }
      } catch (error) {
        console.error('Error fetching note:', error);
        navigate('/error');
      }
    };

    fetchNote();
  }, [noteId]);

  const handleGetNote = (noteId) => {
    fetch(`http://localhost:5001/notes/${noteId}`)
      .then(response => response.json())
      .then(json => setNote(json))
      .catch(error => console.error('Error fetching note:', error));
  };

  useEffect(() => {
    if (noteId) {
      handleGetNote(noteId);
    }
  }, [noteId]);

  const handleDeleteNote = (noteId) => {
    fetch(`http://localhost:5001/notes/${noteId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const updatedNotes= notes.filter(note => note.id !== noteId);
          setNotes(updatedNotes);
        }
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
        navigate('/error');
      });
  };

  return (
    <div className={"flex flex-col items-center"}>
      <Home />
      <div className="w-full flex flex-row items-baseline justify-between">
        <button 
          type="button"
          className="bg-gray-300 hover:bg-gray-500 py-1 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          <Link to="/notes">
            Back
          </Link>
        </button>
        <h1 className="text-2xl font-bold mt-8">{note && note.noteName}</h1>
        <div className="flex flex-row items-center">
          <Link to={`/notes/edit/${noteId}`} className="mr-4">
            &#9997;
          </Link>
          <button
            onClick={() => handleDeleteNote(note.id)}
            className="text-red-500 mr-4 hover:text-red-700"
          >
            &#128465;
          </button>
        </div>
      </div>
      <div className={"flex w-full h-40 pt-8 flex-col gap-5 items-center "}>
        <span className={"w-80 h-40 bg-gray-300 p-2"}>{note && note.noteText}</span>
      </div>
    </div>
  );
}
