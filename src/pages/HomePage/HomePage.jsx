import React from 'react';
import './HomePage.css';

const HomePage = (props) => {
    return (
        <div className='HomePage container py-3'>
            <h1>Home</h1>
            { props.user && <p>This paragraph will show if you are logged in.</p> }
        </div>
    );
};

export default HomePage;