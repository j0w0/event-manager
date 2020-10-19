import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import EventsPage from '../EventsPage/EventsPage';
import EventAddPage from '../EventAddPage/EventAddPage';
import EventPage from '../EventPage/EventPage';
import EventEditPage from '../EventEditPage/EventEditPage';
import MyEventsPage from '../MyEventsPage/MyEventsPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';

class App extends Component {
    constructor() {
        super();
        this.state = {
            ...this.getInitialState()
        };
    }

    getInitialState() {
        return {
            user: userService.getUser()
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
                        <Route exact path='/' render={props =>
                            <Redirect to='/events' />
                        }/>

                        <Route exact path='/events' render={props => 
                            <EventsPage
                                {...props}
                                user={this.state.user}
                            />
                        }/>

                        <Route exact path='/events/new' render={props =>
                            this.state.user ?
                                <EventAddPage
                                    {...props}
                                    user={this.state.user}
                                /> :
                                <Redirect to='/login' />
                        }/>

                        <Route exact path='/events/:id' render={props => 
                            <EventPage
                                {...props}
                                user={this.state.user}
                            />
                        }/>

                        <Route exact path='/events/:id/edit' render={props =>
                            this.state.user ?
                                <EventEditPage
                                    {...props}
                                    user={this.state.user}
                                /> :
                                <Redirect to='/login' />
                        }/>

                        <Route exact path='/my-events' render={props =>
                            this.state.user ?
                                <MyEventsPage
                                    {...props}
                                    user={this.state.user}
                                /> :
                                <Redirect to='/login' />
                        }/>

                        <Route exact path='/signup' render={props => 
                            <SignupPage
                                {...props}
                                user={this.state.user}
                                handleSignupOrLogin={this.handleSignupOrLogin}
                                
                            />
                        }/>

                        <Route exact path='/login' render={props => 
                            <LoginPage
                                {...props}
                                user={this.state.user}
                                handleSignupOrLogin={this.handleSignupOrLogin}
                            />
                        }/>

                        <Route path='/' render={props =>
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