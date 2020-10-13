import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HomePage from '../HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import ProtectedPage from '../ProtectedPage/ProtectedPage';
import userService from '../../utils/userService';
import * as postAPI from '../../services/posts-api';

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
            posts: []
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
    async componentDidMount() {
        // make api calls here
        const posts = await postAPI.getAll();
        this.setState({posts});
    }

    render() {
        return (
            <>
                <Header
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                />
                <main>
                    <Switch>
                        <Route exact path='/' render={() =>
                            <HomePage
                                user={this.state.user}
                                posts={this.state.posts}
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
                </main>
                <Footer />
            </>
        );
    }
}

export default App;