import {
  Routes,
  Route,
  Link,
  redirect,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './routes/Home'
import { Login } from './routes/Login';
import { Registration } from './routes/Registration';
import { About } from './routes/About';
import { Notes } from './routes/Notes';
import { CreateNotes } from './routes/CreateNotes';
import { EditNotes } from './routes/EditNotes';
import { ViewNotes } from './routes/ViewNotes';
import { NotFound } from './routes/NotFound';
import { UserContextProvider } from './components/UserContextProvider';
import { RequireAuth } from './components/RequireAuth';


const router = createBrowserRouter([
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path:"/login", 
        element: <Login />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/notes",
        element: 
        <RequireAuth>
          <Notes />
        </RequireAuth>,
      },
      {
        path: "/notes/create",
        element: 
        <RequireAuth>
          <CreateNotes />
        </RequireAuth>,
      },
      {
        path: "/notes/edit/:id",
        element: 
        <RequireAuth>
          <EditNotes />
        </RequireAuth>,
      },
      {
        path: "/notes/:id",
        element: 
        <RequireAuth>
          <ViewNotes />
        </RequireAuth>,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  {
    path: "/login",
    element: <Login />,
  },
);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
      <div className="flex flex-col mt-4">
          <hr className="w-full mt-4"></hr>
          <div className="absolute bottom-15 left-10 text-2x mt-8">Created by: Vilchinskaya Julia</div>
          <div className="absolute bottom-15 right-10 text-2x mt-8">BSU 2023</div>
      </div>
    </UserContextProvider>
  );
}
export default App;



/*
export function App() {
  return (
    <UserContextProvider>
      <Router>

        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={
              <RequireAuth>
                <Notes />
              </RequireAuth>} />
          <Route path="/notes/create" element={
              <RequireAuth>
                <CreateNotes />
              </RequireAuth>
              } />
          <Route path="/edit/:id" element={
              <RequireAuth>
                <EditNotes />
              </RequireAuth>
          } />
          <Route path="/notes/:id" element={
              <RequireAuth>
                <ViewNotes />
              </RequireAuth>
          } />
          <Route
            path="/"
            element={
              <RequireAuth>
                <About />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <div className="flex flex-col mt-4">
          <hr className="w-full mt-4"></hr>
          <div className="absolute bottom-15 left-10 text-2x mt-8">Created by: Vilchinskaya Julia</div>
          <div className="absolute bottom-15 right-10 text-2x mt-8">BSU 2023</div>
        </div>
      </Router>
    </UserContextProvider>
  );
}*/
