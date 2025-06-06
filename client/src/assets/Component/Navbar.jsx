
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex w-full items-center px-4 py-5 '>
      <div className='w-1/3  '>
        <p>
          Chatappln
        </p>
      </div >
      <div className='w-2/3 flex justify-end flex-row gap-10 '>
        <NavLink to='/path'>
          Home
        </NavLink>
        <NavLink to='/path'>
          Help
        </NavLink>
        <NavLink to='/login'>
          Login
        </NavLink>
        <NavLink to='/path'>
          signup
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
