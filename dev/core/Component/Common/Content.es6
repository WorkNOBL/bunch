import React from 'react'
import CSSModules from 'react-css-modules'

import Component from '../Mixin/Component'
import Style from '../../Style/Common/Content'

@CSSModules(Style)
export default class Content extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <section styleName="root">
                {this.props.children}
            </section>
        )
    }
}
