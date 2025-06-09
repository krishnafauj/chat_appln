// MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Component/Navbar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
