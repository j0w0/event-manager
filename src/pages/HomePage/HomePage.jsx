import React from 'react';
import './HomePage.css';

const HomePage = (props) => {
    return (<>
        <h1>This is the home page.</h1>
        { props.user && <div>This will show if user is logged in.</div> }
    </>);
};

export default HomePage;