import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './assets/Component/loginsignuppage/Login';
function App() {
  return (

    <div className='h-screen  px-10  bg-green-200'>
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        
      </Routes>
    </div>

  );
}

export default App;
