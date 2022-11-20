import React from 'react'
import { Link  } from 'react-router-dom';

function Navbar() {
    
  return (
     <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
 
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/" className="navbar-item">
                            Dashboard
                        </a>
                    </div>
 
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button  className="button is-light" >
                                <Link to="/">
                                   Log Out
                                </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default Navbar
