import React from 'react'
import CSSModules from 'react-css-modules'
import { find, max } from 'lodash'

import EventEmitter from '../../Vendor/EventEmitter'

import Component from '../Mixin/Component'
import Style from '../../Style/List/Event'

import Emotion from '../Common/Emotion'
import Time from '../Common/Time'

@CSSModules(Style, {
    allowMultiple: true
})
export default class Event extends Component {
    constructor(props){
        super(props)

        this.state = {
            details: false
        }
    }

    onClick(type, e){
        let { data } = this.props

        EventEmitter.emit('showModal', {
            type,
            event: data
        })
    }

    openDetails(e){
        let { stats } = this.props.data

        if (stats.max.emotions){
            this.setState({
                details: true
            })
        }
    }

    closeDetails(e){
        this.setState({
            details: false
        })

        e.stopPropagation()
    }

    render(){
        let { data, options, listType } = this.props
        let { recurrence, rating, single_day, stats, date, organizer } = data
        let emotionTypes = ['sad', 'neutral', 'happy']
        let view
        let items
        let tick
        let rootAttributes = {
            styleName: 'root'
        }
        let details
        let answers
        let notes
        let emotions
        let emotionBars

        switch (listType){
        case 'rating':
            emotions = emotionTypes.map((emotion, index) => {
                return (
                    <span styleName="rating-container"
                         key={`rating-container-${emotion}`}>
                        <Emotion type={emotion}
                            onClick={this.onClick.bind(this)}
                            selected={rating && rating.emotion === index}
                            any={!!rating} />
                    </span>
                )
            })

            view = (
                <div styleName="emotions">
                    {emotions}
                </div>
            )
        break
        case 'summary':
            items = data.stats.emotions

            emotions = emotionTypes.map((emotion) => {
                let element

                if (items[emotion]){
                    element = (
                        <div key={`summary-${emotion}`}
                            styleName="stat-container"
                            style={{
                                width: `${(items[emotion] / items.all) * 100}%`
                            }}>
                                <span styleName={`stat-${emotion}`}>
                                    {items[emotion]}
                                </span>
                        </div>
                    )
                }

                return element
            })

            rootAttributes.onClick = this.openDetails.bind(this)

            if (this.state.details){

                if (stats.answers.length){
                    answers = stats.answers.map((answer, index) => {
                        let option = find(options, (option) => {
                            return answer.id === option.id
                        })

                        // Hide this option.
                        if(option.name === "Other Comments or Suggestions") {
                          return '';
                        }

                        return (
                            <div styleName="answer" key={`answers-${index}`}>
                                <span styleName="answer-name">{option.name}</span>
                                <span styleName={`answer-bar${answer.size === stats.max.answers ? '-max' : ''}`}
                                    style={{
                                        width: `${(answer.size / stats.max.answers) * 100}%`
                                    }}>{answer.size}</span>
                            </div>
                        )
                    })
                }

                if (stats.notes.length){
                    notes = stats.notes.map((note, index) => {
                        return (
                            <p key={`notes-${index}`}
                                styleName="feedback-note">"{note}"</p>
                        )
                    })

                    notes = (
                        <div styleName="feedback">
                            <h4 styleName="feedback-title">Other feedback:</h4>
                            <div styleName="feedback-notes">
                                {notes}
                            </div>
                        </div>
                    )
                }

                emotionBars = emotionTypes.map((emotion, index) => {
                    return (
                        <div key={`details-emotion-${index}`}
                            styleName="details-emotion">
                            <div styleName="details-bar-container">
                                <div styleName={`details-bar-${emotion}`} style={{
                                    height: `${(items[emotion] / stats.max.emotions) * 100}%`
                                }}>
                                    <span styleName="details-bar-text">
                                        {items[emotion]}
                                    </span>
                                </div>
                            </div>
                            <Emotion type={emotion} />
                        </div>
                    )
                })

                details = (
                    <div styleName="details">
                        <div styleName="details-answers">
                            {answers}
                            {notes}
                        </div>
                        <div styleName="details-emotions">
                            {emotionBars}
                        </div>
                        <a styleName="close"
                            onClick={this.closeDetails.bind(this)}>close</a>
                    </div>
                )
            } else {
                view = (
                    <div styleName="stats">
                        {emotions}
                    </div>
                )
            }
        break
        }

        if (data.rating && listType === 'rating'){
            tick = (
                <span styleName="tick" />
            )
        }

        return (
            <div {...rootAttributes}>
                <div styleName="inner">
                    {tick}
                    <div styleName="summary">
                        <h3 styleName="title">{data.title}</h3>
                        <Time date={date} recurrence={recurrence}
                            organizer={organizer} />
                    </div>
                    {view}
                </div>
                {details}
            </div>
        )
    }
}
