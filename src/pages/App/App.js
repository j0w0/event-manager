import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HomePage from '../HomePage/HomePage';
import CreditsPage from '../CreditsPage/CreditsPage';
import EventsPage from '../EventsPage/EventsPage';
import EventPage from '../EventPage/EventPage';
import MyEventsPage from '../MyEventsPage/MyEventsPage';
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
                        <Route exact path='/' render={({ ...props }) =>
                            <HomePage
                                {...props}
                                user={this.state.user}
                                events={this.state.events}
                            />
                        }/>

                        <Route exact path='/credits' render={({ ...props }) =>
                            userService.getUser() ?
                                <CreditsPage {...props} /> :
                                <Redirect to ='/login' />
                        }/>

                        <Route exact path='/events' render={({ ...props }) => 
                            <EventsPage {...props} />
                        }/>

                        <Route exact path='/event/:id' render={({ ...props }) =>
                            <EventPage
                                {...props}
                                events={this.state.events}
                            />
                        }/>

                        <Route exact path='/my-events' render={({ ...props }) =>
                            userService.getUser() ?
                                <MyEventsPage {...props} /> :
                                <Redirect to='/login' />
                        }/>

                        <Route exact path='/admin' render={({ ...props }) => 
                            userService.getUser() ?
                                <AdminPage {...props} /> :
                                <Redirect to='/login' />
                        }/>

                        <Route exact path='/signup' render={({ ...props }) => 
                            <SignupPage
                                {...props}
                                handleSignupOrLogin={this.handleSignupOrLogin}
                            />
                        }/>

                        <Route exact path='/login' render={({ ...props }) => 
                            <LoginPage
                                {...props}
                                handleSignupOrLogin={this.handleSignupOrLogin}
                            />
                        }/>

                        <Route path='/' render={({ ...props }) =>
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