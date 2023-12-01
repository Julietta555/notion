import { Link } from 'react-router-dom';
export function NotFound() {
  return (
    <div>
      <h3 className="flex justify-center text-3x mt-10 font-semibold">404</h3>  
      <h1 className="flex justify-center text-3xl font-bold">Page not found</h1>
      <div className="flex justify-center text-3x gap-1 mt-2"><h3 className="text-gray-500">Go</h3><Link className="hover:text-blue-700 hover:underline" to="/">Home</Link></div>
    </div>
  );
}
