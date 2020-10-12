import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import ProtectedPage from '../ProtectedPage/ProtectedPage';
import userService from '../../utils/userService';

class App extends Component {
    constructor() {
        super();
        this.state = {
            ...this.getInitialState(),
            user: userService.getUser()
        };
    }

    getInitialState() {
        return {
            // key: value,
        };
    }

    /*--- Callback Methods ---*/
    handleLogout = () => {
        userService.logout();
        this.setState({ user: null });
    }

    handleSignupOrLogin = () => {
        this.setState({ user: userService.getUser() });
    }

    /*--- Lifecycle Methods ---*/
    async componentDidMount() { }

    render() {
        return (
            <div>
                <header className='header-footer'>MERN with Auth Starter</header>
                <Switch>

                    <Route exact path='/' render={() =>
                        <HomePage
                            user={this.state.user}
                            handleLogout={this.handleLogout}
                        />
                    }/>

                    <Route exact path='/signup' render={({ history }) => 
                        <SignupPage
                            history={history}
                            handleSignupOrLogin={this.handleSignupOrLogin}
                        />
                    }/>

                    <Route exact path='/login' render={({ history }) => 
                        <LoginPage
                            handleSignupOrLogin={this.handleSignupOrLogin}
                            history={history}
                        />
                    }/>

                    <Route exact path='/protected' render={({ history }) => 
                        userService.getUser() ?
                            <ProtectedPage /> :
                            <Redirect to='/login' />
                    }/> 

                </Switch>
            </div>
        );
    }
}

export default App;