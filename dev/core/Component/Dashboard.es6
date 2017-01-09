import React from 'react'
import CSSModules from 'react-css-modules'
import AltContainer from 'alt-container'

import Component from './Mixin/Component'
import Button from './Common/Button'
import Header from './Common/Header'
import Title from './Common/Title'
import Content from './Common/Content'
import Link from './Common/Link'

import Style from '../Style/Dashboard'

import { default as Store } from '../Store/Event'
import { default as Action } from '../Action/Event'

@CSSModules(Style)
export default class Dashboard extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        Store.fetchList()
    }

    render(){
        let { data } = this.props.store
        let children = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                data
            })
        })

        return (
            <div styleName="root">
                <Header>
                    <div styleName="links">
                        <Link to="/dashboard/rate">Rate Meetings</Link>
                        <Link to="/dashboard/summary">View Ratings</Link>
                    </div>
                    <div styleName="email">
                        <span>{data.email}</span>
                        <span styleName="logout"><a href="/logout">Logout</a></span>
                    </div>
                </Header>
                {children}
            </div>
        )
    }
}
