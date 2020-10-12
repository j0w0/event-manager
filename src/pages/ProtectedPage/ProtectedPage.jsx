import React, { Component } from 'react';
import './ProtectedPage.css';

class ProtectedPage extends Component {
    render() {
        return (
            <div className='ProtectedPage container py-3'>
                <h1>Protected Route</h1>
                <p>If you're seeing this page, you're logged in.</p>
            </div>
        );
    }
} 

export default ProtectedPage;