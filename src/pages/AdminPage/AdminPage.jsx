import React, { Component } from 'react';
import './AdminPage.css';

class AdminPage extends Component {
    render() {
        return (
            <div className='AdminPage container py-3'>
                <h1>Admin</h1>
                <p>If you're seeing this page, you're logged in AND an admin.</p>
            </div>
        );
    }
} 

export default AdminPage;