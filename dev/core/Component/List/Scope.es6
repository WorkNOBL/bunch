import React from 'react'
import CSSModules from 'react-css-modules'
import { groupBy, forEach } from 'lodash'

import Component from '../Mixin/Component'
import Style from '../../Style/List/Scope'

import Group from './Group'

@CSSModules(Style)
export default class Scope extends Component {
    constructor(props){
        super(props)
    }

    render(){
        let { type, events, listType, options } = this.props
        let elements = []
        let groups = groupBy(events, (event) => {
            let number = 1

            if (type === 'weekly' && event.recurrence){
                number = event.recurrence.validations.day ?
                    event.recurrence.validations.day.length : 7
            }

            return number
        })

        forEach(groups, (events, index) => {
            elements.push(
                <Group key={`list-group-${index}`}
                    type={type}
                    events={events}
                    options={options}
                    perNumber={index}
                    listType={listType} />
            )
        })

        elements = elements.reverse()

        return (
            <div styleName="root">
                {elements}
            </div>
        )
    }
}
