import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './HomePage.css';

const HomePage = (props) => {
    return (
        <div>
            <NavBar
                user={props.user}
                handleLogout={props.handleLogout}
            />
            <main>
                <h1>This is the home page.</h1>
                { props.user && <div>this should show if user is logged in</div> }
            </main>
            <footer className='header-footer'>
                <p>Footer</p>
            </footer>
        </div>
    );
};

export default HomePage;