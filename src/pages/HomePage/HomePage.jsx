import React from 'react';
import './HomePage.css';

const HomePage = (props) => {
    return (
        <div className='HomePage'>
            <h1>Home</h1>
            { props.user && <div>This will show if user is logged in.</div> }
        </div>
    );
};

export default HomePage;