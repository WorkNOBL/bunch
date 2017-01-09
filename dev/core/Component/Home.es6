import React from 'react'
import CSSModules from 'react-css-modules'

import Component from './Mixin/Component'
import Button from './Common/Button'
import Header from './Common/Header'
import Title from './Common/Title'
import Content from './Common/Content'

import Style from '../Style/Home'

@CSSModules(Style)
export default class Home extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div styleName="root">
                <Header />
                <Title>
                    <div styleName="slogan">
                        <h2 styleName="title">Hi, and welcome to BUNCH!</h2>
                        <p styleName="text">To get started, please sign up with your Google Apps account. This will connect your calendar so you can start using the prototype right away!</p>
                    </div>
                </Title>
                <Content>
                    <div styleName="button-container">
                        <Button href="/auth/google" target="_blank">
                            Connect Your Google Calendar
                        </Button>
                    </div>
                </Content>
            </div>
        )
    }
}
