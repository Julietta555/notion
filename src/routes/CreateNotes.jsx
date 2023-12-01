import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../components/UserContextProvider";
import { Home } from './Home'

const Note= z.object({
    userId: z.string(),
    id: z.number(),
    createdAt: z.string(),
    noteName: z.string().min(1, 'Name cant be empty'),
    noteText: z.string(),
  }); 

export function CreateNotes() {
  const { user } = useContext(UserContext); 
  const [noteName, setName] = useState('');
  const [noteText, setText] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleCreate = () => {
    //const storedUser = JSON.parse(localStorage.getItem("user"));
    //const userId = storedUser ? storedUser.id : null;

    const note = {
      userId: user.id,
      noteName,
      noteText,
      createdAt: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
    };

    fetch("http://localhost:5001/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/notes");
  };

return (
    <div className="text-center mt-5 flex flex-col items-center justify-center">
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
        <h1 className="text-3xl font-bold mt-8">Create new note</h1>
        <button 
          type="button"
          className="mt-4 bg-wight text-white"
        >
            Back
        </button>
      </div>

      <div className="mb-4">
          <input
            className="w-80 mt-10 py-2 px-3 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            type="text"
            id="noteName"
            placeholder="Name"
            value={noteName}
            onChange={(e) => setName(e.target.value)} 
          />
          {errors.noteName && <p className="text-red-500">{errors.noteName}</p>}
      </div>
      <textarea 
         className="w-80 h-40 py-2 px-3 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
         type="text"
         id="noteText"
         placeholder="Note text..."
         value={noteText}
         onChange={(e) => setText(e.target.value)} 
      />

      <button 
        type="button"
        className="mt-4 bg-gray-300 hover:bg-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleCreate}
      >
        <Link to="/notes">
           Create
        </Link>
      </button>
    </div>
  )
}