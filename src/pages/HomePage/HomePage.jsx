import React from 'react';
import './HomePage.css';

const HomePage = (props) => {
    return (
        <div className='HomePage container py-3'>
            <h1>Home</h1>
            { props.user && <p>This will show if user is logged in.</p> }
        </div>
    );
};

export default HomePage;