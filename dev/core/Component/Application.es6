import React from 'react'
import CSSModules from 'react-css-modules'
import AltContainer from 'alt-container'
import { isEmpty } from 'lodash'

import Component from './Mixin/Component'
import Style from '../Style/Application'

import { default as Store } from '../Store/User'
import { default as Action } from '../Action/User'

@CSSModules(Style)
export default class Application extends Component {
    constructor(props){
        super(props)

        this.state = {
            flash: window.flash
        }
    }

    componentDidMount(){
        this.timer = setTimeout(() => {
            this.setState({
                flash: {}
            })
        }, 2000)
    }

    componentWillUnmount(){
        clearTimeout(this.timer)
    }

    render(){
        let { flash } = this.state
        let message
        let type

        if (!isEmpty(flash)){
            type = flash.error ? 'error' : 'success'

            message = (
                <div styleName={`flash-${type}`}>
                    {flash.text}
                </div>
            )
        }

        return (
            <div styleName="root">
                {message}
                <AltContainer stores={{ store: Store }}
                    actions={{ action: Action }}>
                    {this.props.children}
                </AltContainer>
            </div>
        )
    }
}
