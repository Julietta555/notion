import { Link, useLocation } from 'react-router-dom';
import { UserContext } from "../components/UserContextProvider";
import { useContext } from 'react';

export function Home() {
  const { user } = useContext(UserContext);
  

  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <div className="flex flex-row gap-48">
        <h3>Hello, {user?.email}</h3>
        <div className="flex flex-row items-end justify-between gap-10">
          <Link className={location.pathname === "/about" ? "font-bold" : ""} to="/about">About</Link>
          <Link className={location.pathname === "/notes" ? "font-bold" : ""} to="/notes">Notes</Link>
          <Link className={location.pathname === "/login" ? "font-bold" : ""} to="/login">Log out</Link>
        </div>
      </div>  
    </div>
  );
}