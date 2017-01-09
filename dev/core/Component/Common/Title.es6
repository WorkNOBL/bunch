import React from 'react'
import CSSModules from 'react-css-modules'

import Component from '../Mixin/Component'
import Style from '../../Style/Common/Title'

@CSSModules(Style)
export default class Title extends Component {
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
