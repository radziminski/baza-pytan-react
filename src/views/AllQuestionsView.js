import React, { Component, Fragment } from 'react';
import QuestionsBox from '../components/QuestionsBox';
import { Footer } from '../layouts/Footer';
import { Redirect, Link, Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
import NavBar from '../layouts/NavBar';
import { connect } from 'react-redux';
import { loadUser } from '../actions/authActions';
import { auth } from '../firebase';

export class AllQuestionsView extends Component {
    componentDidMount() {
        auth.onAuthStateChanged(user => {
            this.props.loadUser(user);
        });
    }
    render() {
        return (
            <Fragment>
                <main className="main">
                    <section className="questions">
                        <NavBar />
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route exact path="/" component={QuestionsBox} />
                        </Switch>
                    </section>
                </main>

                <Footer />
            </Fragment>
        );
    }
}

export default connect(null, { loadUser })(AllQuestionsView);
