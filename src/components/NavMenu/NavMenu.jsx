import React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = (props) => {
    let menu = props.user ?
    <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <Link to='' onClick={props.handleLogout} className="nav-link">Log Out</Link>
        </li>
        <span className=''>Welcome, {props.user.name}</span>
    </ul>
    :
    <ul className="navbar-nav ml-auto">
        <li className="nav-item"><Link to='/login' className='nav-link'>Log In</Link></li>
        <li className="nav-item"><Link to='/signup' className='nav-link'>Sign Up</Link></li>
    </ul>;

    return menu;
};

export default NavMenu;