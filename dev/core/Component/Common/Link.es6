import React from 'react'
import CSSModules from 'react-css-modules'
import { Link as RouterLink } from 'react-router'

import Component from '../Mixin/Component'
import Style from '../../Style/Common/Link'

@CSSModules(Style)
export default class Link extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <RouterLink styleName="root"
                activeClassName="link--active" {...this.props}>
                {this.props.children}
            </RouterLink>
        )
    }
}
