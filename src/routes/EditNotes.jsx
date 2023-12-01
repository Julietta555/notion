import { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Home } from './Home'
import { UserContext } from "../components/UserContextProvider";
import { Link, useParams } from 'react-router-dom';

export function EditNotes() {
  const { user } = useContext(UserContext);
  const { notes, setNotes } = useContext(UserContext);
  const [createdAt, setCreatedAt] = useState('');
  const [noteName, setName] = useState('');
  const [noteText, setText] = useState('');
  const [errors, setErrors] = useState([]);

  const params = useParams();
  const noteId = params.id;

  const handleSetName = useCallback((e) => setName(e.target.value), []);
  const handleSetText = useCallback((e) => setText(e.target.value), []);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5001/notes/${noteId}`);
        if (response.ok) {
          const noteInfo = await response.json();
          setName(noteInfo.noteName);
          setText(noteInfo.noteText);
          //setCreatedAt(noteInfo.createdAt);
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


  const handleEdit = () => {
    const newErrors = [];

    if (noteName.trim() === '') {
      newErrors.push('Title cannot be empty');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const updated = {
        id: noteId,
        userId: user.id,
        noteName: noteName,
        noteText: noteText,
        createdAt: createdAt,
      };

      fetch(`http://localhost:5001/notes/${noteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          noteName: noteName,
          noteText: noteText,
        }),
      })
        .then(response => {
          if (response.ok) {
            setNotes(notes.map(note =>
              note.id === id ? updated : note
            ));
            navigate('/notes');
          } else {
            throw new Error('Failed to update note');
          }
        })
        .catch(error => {
          console.error('Error saving note:', error);
          setErrors(['Error with saving note']);
        });
    } catch (error) {
      console.error('Error saving note:', error);
      navigate('/error');
    }
  };
  

  return (
    <div className="flex flex-col items-center">
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
        <h1 className="text-3xl font-bold mt-8">Edit note</h1>
        <button 
          type="button"
          className="mt-4 bg-wight text-white"
        >
            Back
        </button>
      </div>      
      <div className="flex pt-8 flex-col gap-5 items-center w-full">
        <input
          type="text"
          placeholder={"Name"}
          id="noteName"
          value={noteName}
          onChange={handleSetName}          
          className="bg-gray-200 p-2 w-full ml-5"
        ></input>
        {errors.includes('Title cannot be empty') && (
            <p className="text-red-500">Title cannot be empty</p>
          )}
        <input
          type="text"
          placeholder="EditNote text..."
          id="noteText"
          value={noteText}
          onChange={handleSetText}          
          className="bg-gray-200 p-2 w-full ml-5"
        ></input>
        <button 
          className="mt-4 mb-4 bg-gray-300 hover:bg-gray-500 py-2 px-4 rounded"
          onClick={handleEdit}>
            <Link to="/notes">
            Save
          </Link>
        </button>
      </div>
    </div>
  );
}

export default EditNotes;
