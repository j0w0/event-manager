import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HomePage from '../HomePage/HomePage';
import CreditsPage from '../CreditsPage/CreditsPage';
import EventsPage from '../EventsPage/EventsPage';
import EventPage from '../EventPage/EventPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import AdminPage from '../AdminPage/AdminPage';
import userService from '../../utils/userService';
import * as eventAPI from '../../services/events-api';
// import Page404 from '../404/404';

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
            events: []
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
        const events = await eventAPI.getAll();
        this.setState({events});
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
                                events={this.state.events}
                            />
                        }/>

                        <Route exact path='/credits' render={({ history }) =>
                            userService.getUser() ?
                                <CreditsPage /> :
                                <Redirect to ='/login' />
                        }/>

                        <Route exact path='/events' render={({ history }) => 
                            <EventsPage />
                        }/>

                        <Route exact path='/event' render={({ location }) => 
                            <EventPage location={location} />
                        }/>

                        <Route exact path='/admin' render={({ history }) => 
                            userService.getUser() ?
                                <AdminPage /> :
                                <Redirect to='/login' />
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

                        <Route path='/' render={() =>
                            // page not found, redirect to root
                            <Redirect to='/' />
                        }/>
                    </Switch>
                </main>
                <Footer />
            </>
        );
    }
}

export default App;