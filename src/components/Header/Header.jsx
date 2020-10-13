import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import NavMenu from '../NavMenu/NavMenu';

const Header = (props) => {
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

                <NavLink to='' className="navbar-brand">MERN + Auth</NavLink>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <NavMenu
                        user={props.user}
                        handleLogout={props.handleLogout}
                    />
                </div>
                
            </nav>
        </header>
    );
};

export default Header;