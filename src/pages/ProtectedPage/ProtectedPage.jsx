import React, { Component } from 'react';
import './ProtectedPage.css';

class ProtectedPage extends Component {
    render() {
        return (
            <div classNam='ProtectedPage'>
                <h1>Protected Route</h1>
                You must be logged in to view this page, otherwise it will redirect to /login.
            </div>
        );
    }
} 

export default ProtectedPage;