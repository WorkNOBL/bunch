import React from 'react'
import CSSModules from 'react-css-modules'

import Component from '../Mixin/Component'
import Style from '../../Style/Common/Time'
import Helper from '../../Helper/Function'

@CSSModules(Style)
export default class Time extends Component {
    constructor(props){
        super(props)
    }

    render(){
        let { date, recurrence, organizer } = this.props

        if (recurrence && recurrence.validations){

            if (recurrence.validations.day){
                recurrence = recurrence.validations.day.map((number) => {
                    return Helper.numberToDay(number)
                })
            } else {
                recurrence = Helper.createAllWeek()
            }

            recurrence = (
                <span>{recurrence.join(', ')}</span>
            )
        }

        if (date){
            date = (
                <span styleName="date">{date.time_start} - {date.time_end}</span>
            )
        }

        if (organizer){
            organizer = (
                <span styleName="organizer"> by {organizer}</span>
            )
        }

        return (
            <div styleName="root">
                {date}{recurrence}{organizer}
            </div>
        )
    }
}
