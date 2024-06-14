import React from 'react'

function Navbar() {
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand me-auto" href="#">Logo</a>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                            <li className="nav-item">
                                <a className="nav-link active mx-lg-2" aria-current="page" style={{fontSize:"20px"}} href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-lg-2" style={{fontSize:"20px"}} href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-lg-2"style={{fontSize:"20px"}} href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-lg-2" style={{fontSize:"20px"}} href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-lg-2" style={{fontSize:"20px"}} href="#">Link</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <a href="" className='login-button'>Login</a>
            </div>
        </nav>
    </div>
  )
}

export default Navbar