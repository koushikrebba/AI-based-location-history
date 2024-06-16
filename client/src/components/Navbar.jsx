import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CounterContext } from './CounterContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    let { user, setUser } = useContext(CounterContext)
    let navigate=useNavigate()
    function handleLogout() {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/home')
    }

    return (
        <div className="navbar-container ">
            <nav className="navbar navbar-expand-lg  text-white w-90 ms-1 me-1 mt-2 pe-4" style={{backgroundColor:"#1A151A",borderRadius:"20px"}}>
                <div className="container-fluid p-1">
                    <img className='ms-5' style={{width:"50px"}} src="https://4.bp.blogspot.com/-pLeslkixF-I/XIEPjEcrdQI/AAAAAAAAA58/JahHA3E6dCki9bmgPbGvwwIDWHkC_3SbACLcBGAs/s1600/logos_geoimage_v3.png" alt="" />
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end align-items-center gap-5 me-2'>
                        <NavLink to='/home' className="nav-link">Home</NavLink>
                        {
                            user === null ? (
                                <>
                                    <NavLink to='/signup' className="nav-link">SignUp</NavLink>
                                    <NavLink to='/login' className="nav-link">Login</NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink to='/search' className='nav-link'>Search Location</NavLink>
                                    <NavLink to='/past-searches'className='nav-link'>Past Searches</NavLink>
                                    <NavLink to='/videos' className='nav-link'>Videos</NavLink>
                                    <span onClick={handleLogout} style={{ cursor: 'pointer' }}><b className='fs-6'>Logout</b></span>
                                    <div className='text-center mt-2'>
                                        <h5 style={{fontFamily:"monospace"}}>{user.firstname} {user.lastname}</h5>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
