import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = (props) => {
    let menu = props.user ?
    <ul className="navbar-nav ml-auto">
        <span className='navbar-text'>Welcome, {props.user.name}</span>
        <li className="nav-item">
            <NavLink to='' onClick={props.handleLogout} className="nav-link">Log Out</NavLink>
        </li>
    </ul>
    :
    <ul className="navbar-nav ml-auto">
        <li className="nav-item"><NavLink to='/login' className='nav-link'>Log In</NavLink></li>
        <li className="nav-item"><NavLink to='/signup' className='nav-link'>Sign Up</NavLink></li>
    </ul>;

    return menu;
};

export default NavMenu;