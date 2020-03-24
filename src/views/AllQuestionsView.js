import React, { Component, Fragment } from 'react';
import QuestionsBox from '../components/QuestionsBox';
import { Footer } from '../layouts/Footer';
import { Redirect, Link, Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
import NavBar from '../layouts/NavBar';
import { connect } from 'react-redux';
import { loadUser } from '../actions/authActions';
import { auth } from '../firebase';
import AccountDashboard from './AccountDashboard';
import UserNavBar from '../layouts/UserNavBar';
import AdminDashboard from './AdminDashboard';

export class AllQuestionsView extends Component {
    componentDidMount() {
        auth.onAuthStateChanged(user => {
            console.log(user);
            this.props.loadUser(user);
        });
    }
    render() {
        return (
            <Fragment>
                <main className="main">
                    <section className="questions">
                        <NavBar />
                        <div className="content-container">
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Route path="/account" component={AccountDashboard} />
                                <Route path="/admin" component={AdminDashboard} />
                                <Route exact path="/" component={QuestionsBox} />
                            </Switch>
                        </div>
                    </section>
                </main>

                <Footer />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loadUser })(AllQuestionsView);
