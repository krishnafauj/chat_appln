import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './assets/Component/loginsignuppage/Login';
import Signup from './assets/Component/loginsignuppage/Signup';
import PrivateRoute from './PrivateRoute';
import SearchResults from './assets/Component/chat/SearchResults';
import Navbar from './assets/Component/Navbar';
import MainLayout from './assets/MainLayout';
import ChatPage from './assets/Component/chat/Chatpage';
function App() {
  return (
    <div className='min-h-screen  px-10  bg-green-200'>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route  element={<PrivateRoute/>}>
          <Route element={<MainLayout/>}>
            <Route path='/' element={<Home />} />
            <Route path="/results" element={<SearchResults />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
        </Route>


      </Routes>
    </div>

  );
}

export default App;
