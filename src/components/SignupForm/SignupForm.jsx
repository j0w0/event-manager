import React, { Component } from 'react';
import userService from '../../utils/userService';

class SignupForm extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        passwordConf: ''
    };

    handleChange = (e) => {
        this.props.updateMessage('');
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.signup(this.state);
            this.props.handleSignupOrLogin();
            this.props.history.push('/');
        } catch (err) {
            this.props.updateMessage(err.message);
        }
    }

    isFormInvalid() {
        return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.goBack();
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input type="text" className="form-control" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} required />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} required />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} required />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} required />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12 text-center">
                        <button className="btn btn-primary" disabled={this.isFormInvalid()}>Sign Up</button>
                        <button className='btn btn-link text-muted' onClick={this.handleCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default SignupForm;