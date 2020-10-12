import React from 'react';
import './Header.css';
import NavMenu from '../NavMenu/NavMenu';

const Header = (props) => {
    return (
        <header>
            MERN Stack w Auth
            <NavMenu
                user={props.user}
                handleLogout={props.handleLogout}
            />
        </header>
    );
};

export default Header;