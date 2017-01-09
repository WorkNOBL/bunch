import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, IndexRedirect, Redirect } from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'

import Application from '../Component/Application'
import Home from '../Component/Home'
import Dashboard from '../Component/Dashboard'
import Rating from '../Component/Rating'
import Summary from '../Component/Summary'

import { default as App } from './Application'

new App()
    .then((data) => {
        const Routes = data.status ? (
            <Route path="/" component={Application}>
                <Route path="/dashboard" component={Dashboard}>
                    <Route path="/dashboard/rate" component={Rating} />
                    <Route path="/dashboard/summary" component={Summary} />
                    <IndexRedirect to="/dashboard/rate" />
                </Route>
                <IndexRedirect to="/dashboard" />
            </Route>
        ) : (
            <Route path="/" component={Application}>
                <IndexRoute component={Home} />
            </Route>
        )

        ReactDOM.render((
            <Router history={createHashHistory()}>
                {Routes}
                <Route path="*" component={Application}>
                    <IndexRedirect to="/" />
                </Route>
            </Router>
        ), document.getElementById('application'))
    })
    .catch((error) => {
        console.error(error.stack)
    })
