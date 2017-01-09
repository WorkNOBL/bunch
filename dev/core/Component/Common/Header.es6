import React from 'react'
import CSSModules from 'react-css-modules'

import Component from '../Mixin/Component'
import Style from '../../Style/Common/Header'

@CSSModules(Style)
export default class Header extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <header styleName="root">
                <a styleName="logo">Nobl</a>
                {this.props.children}
            </header>
        )
    }
}
