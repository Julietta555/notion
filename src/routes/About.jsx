import { Link } from 'react-router-dom';
import { UserContext } from "../components/UserContextProvider";
import { useContext } from 'react';
import { Home } from './Home'

export function About() {
  const { user } = useContext(UserContext);

  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <Home /> 
      <h1 className="flex justify-center text-3xl font-bold mt-10 mb-10">About me</h1>
      <div className="flex flex-row justify-center gap-1"><h2 className="font-bold">Email: </h2><h2 className="text-gray-500">{user?.email}</h2></div>
      <div className="flex flex-row justify-center gap-1"><h2 className="font-bold">Date sign up:</h2><h2 className="text-gray-500">{user?.createdAt}</h2></div>
      <button
          type="button"
          className="flex items-center bg-gray-300 hover:bg-gray-500 font-bold mt-4 py-2 px-4 rounded focus:outline-none justify-center"
        >
          <Link to="/notes">
            Go to notes
          </Link>
      </button>
      
    </div>
  );
}
