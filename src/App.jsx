import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import { FaEdit } from "react-icons/fa";


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: '/pastes',
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: '/pastes/:id',
    element: (
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
]);

function App() {
  return (
    <div className='p-7 mt-7'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
