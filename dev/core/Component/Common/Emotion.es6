import React from 'react'
import CSSModules from 'react-css-modules'

import Component from '../Mixin/Component'
import Style from '../../Style/Common/Emotion'

@CSSModules(Style)
export default class Emotion extends Component {
    constructor(props){
        super(props)
    }

    render(){
        let { type, onClick, small, selected, any } = this.props
        let element
        let className
        let title

        if (small){
            className = `small-${type}`
        } else if (selected){
            className = `selected-${type}`
        } else if (any){
            className = `any-${type}`
        } else {
            className = type
        }

        switch (type){
        case 'happy':
            title = 'Engaging and productive!'
        break
        case 'neutral':
            title = 'Unsure'
        break
        case 'sad':
            title = 'Frustrating and Pointless!'
        break
        }

        if (onClick){
            element = (
                <a styleName={className}
                    title={title}
                    onClick={this.props.onClick.bind(this, type)} />
            )
        } else {
            element = (
                 <a styleName={className} />
            )
        }

        return element
    }
}
