import React from 'react'
import CSSModules from 'react-css-modules'
import { sortBy } from 'lodash'

import Component from '../Mixin/Component'
import Style from '../../Style/List/Group'

import Event from './Event'

@CSSModules(Style)
export default class Group extends Component {
    constructor(props){
        super(props)
    }

    render(){
        let { events, listType, perNumber, type, options } = this.props

        if (listType === 'summary'){
            events = sortBy(events, (event) => {
                return event.stats.emotions.all
            }).reverse()
        }

        events = events.map((event, index) => {
            return (
                <Event key={`group-event-${index}`}
                    data={event}
                    options={options}
                    listType={listType} />
            )
        })

        switch (type){
        case 'weekly':
            type = 'week'
        break
        case 'monthly':
            type = 'month'
        break
        case 'yearly':
            type = 'year'
        break
        }

        return (
            <div styleName="root">
                <div styleName="per-week" className={`background--${perNumber}x`}>
                    <span>{perNumber}x/{type}</span>
                </div>
                <div styleName="events">
                    {events}
                </div>
            </div>
        )
    }
}
