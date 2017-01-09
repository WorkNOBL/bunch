import React from 'react'
import CSSModules from 'react-css-modules'
import Loader from 'react-loader'
import { groupBy, forEach, indexOf } from 'lodash'

import Component from '../Mixin/Component'
import Style from '../../Style/List/List'

import Scope from './Scope'

import { default as Store } from '../../Store/Event'

@CSSModules(Style)
export default class List extends Component {
    constructor(props){
        super(props)
    }

    render(){
        let { type, store } = this.props
        let { events, options, status, message, isListLoading } = store
        let elements = []
        let scopes

        if (isListLoading){
            elements = (
                <div styleName="loader">
                    <span styleName="loader-text">
                        Bunch is currently scanning your calendar. This should only take a few moments.
                    </span>
                    <Loader loaded={false}
                        options={{
                            width: 3
                        }} />
                </div>
            )
        } else if (status){
            scopes = groupBy(events, (event) => {
                let type = 'weekly'

                if (event.recurrence && event.recurrence.freq){
                    type = indexOf(['weekly', 'daily'], event.recurrence.freq) > -1 ?
                        'weekly' :
                        event.recurrence.freq
                }

                return type
            })

            forEach(scopes, (events, index) => {
                elements.push(
                    <Scope key={`list-scope-${index}`}
                        type={index}
                        events={events}
                        options={options}
                        listType={type} />
                )
            })
        } else {
            elements = (
                <div styleName="message">
                    {message}
                </div>
            )
        }

        return (
            <div styleName="root">
                {elements}
            </div>
        )
    }
}
