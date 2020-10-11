import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
    let nav = props.user ?
    <div>
        <Link to='' onClick={props.handleLogout} className='NavBar-link'>LOG OUT</Link>
        <span className='NavBar-welcome'>WELCOME, {props.user.name}</span>
    </div>
    :
    <div>
        <Link to='/login' className='NavBar-link'>LOG IN</Link>
        <Link to='/signup' className='NavBar-link'>SIGN UP</Link>
    </div>;

    return (
        <div className='NavBar'>
            {nav}
        </div>
    );
};

export default NavBar;