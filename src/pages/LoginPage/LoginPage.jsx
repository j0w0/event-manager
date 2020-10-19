import React, { Component } from 'react';
import './LoginPage.css';
import userService from '../../utils/userService';

class LoginPage extends Component {

    state = {
        email: '',
        pw: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.login(this.state);
            this.props.handleSignupOrLogin();
            // logged in, show HomePage
            this.props.history.push('/events');
        } catch (err) {
            // show a modal or some other ui instead
            alert('Invalid login');
        }
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="LoginPage container py-3">
                <h1>Log In</h1>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 text-center">
                            <button className="btn btn-primary">Log In</button>
                            <button className="btn btn-link text-muted" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;