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
    }

    return (
        <div className="navbar-container">
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container-fluid p-2">
                    <a className="navbar-brand me-auto" href="#">Logo</a>
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
                                    <NavLink onClick={handleLogout} to='/login' className="nav-link">Login</NavLink>
                                </>
                            ) : (
                                <>
                                    <span onClick={handleLogout} style={{ cursor: 'pointer' }}><b className='fs-6'>Logout</b></span>
                                    <div className='text-center'>
                                        <h6 style={{ display: 'block' }}>Welcome</h6>
                                        <h5>{user.firstname} {user.lastname}</h5>
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
