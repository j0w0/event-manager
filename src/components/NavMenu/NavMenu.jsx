import React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = (props) => {
    let nav = props.user ?
    <ul>
        <li><Link to='' onClick={props.handleLogout} className=''>LOG OUT</Link></li>
        <span className=''>WELCOME, {props.user.name}</span>
    </ul>
    :
    <ul>
        <li><Link to='/login' className=''>LOG IN</Link></li>
        <li><Link to='/signup' className=''>SIGN UP</Link></li>
    </ul>;

    return nav;
};

export default NavMenu;