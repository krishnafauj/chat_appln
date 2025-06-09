import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './assets/Component/loginsignuppage/Login';
import Signup from './assets/Component/loginsignuppage/Signup';
import PrivateRoute from './PrivateRoute';
import SearchResults from './assets/Component/chat/SearchResults';
import Navbar from './assets/Component/Navbar';

function App() {
  return (

    <div className='h-screen  px-10  bg-green-200'>
      <Navbar />
      <Routes>
       {/* Always visible */}
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path="/results" element={<SearchResults />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
              
            </PrivateRoute>
          }
        />


      </Routes>
    </div>

  );
}

export default App;
