import React from 'react'
import CSSModules from 'react-css-modules'
import Ink from 'react-ink'

import Component from '../Mixin/Component'
import Style from '../../Style/Common/Button'

@CSSModules(Style)
export default class Button extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <a styleName="root" {...this.props}>
                <Ink />
                {this.props.children}
            </a>
        )
    }
}
