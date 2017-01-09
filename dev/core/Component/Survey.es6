import React from 'react'
import CSSModules from 'react-css-modules'
import { some, remove, filter } from 'lodash'

import Component from './Mixin/Component'
import Style from '../Style/Survey'
import Helper from '../Helper/Function'

import Emotion from './Common/Emotion'
import Button from './Common/Button'
import Time from './Common/Time'

import { default as Store } from '../Store/Event'

@CSSModules(Style, {
    allowMultiple: true
})
export default class Survey extends Component {
    constructor(props){
        super(props)

        let { event } = this.props.data
        let checked = []
        let notes = {}

        if (event.rating){
            checked = event.rating.answers.map((answer) => {
                let { note, option_id } = answer

                if (note){
                    notes[option_id] = note
                }

                return {
                    id: option_id
                }
            })
        }

        this.state = {
            checked,
            notes
        }
    }

    onOptionChoose(option){
        let { checked } = this.state
        let exists = some(checked, (checked) => {
            return checked.id === option.id
        })

        if (exists){
            remove(checked, (checked) => {
                return checked.id === option.id
            })
        } else {
            checked.push(option)
        }

        this.setState({
            checked
        })
    }

    onNoteChange(option, e){
        let { notes } = this.state

        notes[option.id] = e.target.value

        this.setState({
            notes
        })
    }

    onSave(){
        let { store, data } = this.props
        let { options } = store
        let { checked, notes } = this.state
        let obj
        let emotion

        if (data.type === 'happy'){
            checked = filter(checked, (option) => {
                return option.note
            })
        }

        checked = checked.map((option) => {
            let obj = {
                id: option.id
            }

            if (notes[option.id]){
                obj.note = notes[option.id]
            }

            return obj
        })

        switch (data.type){
        case 'happy':
            emotion = 2
        break
        case 'neutral':
            emotion = 1
        break
        case 'sad':
            emotion = 0
        break
        }

        obj = Helper.buildAjaxObject('rating', {
            emotion,
            event_id: data.event.id,
            calendar_id: data.event.calendar_id,
            options: checked
        })

        Store.createRating(obj)
    }

    render(){
        let { store, data } = this.props
        let { options, isRatingLoading } = store
        let { recurrence, title, date, organizer } = data.event
        let button
        let paragraph

        if (options){

            if (data.type === 'happy'){
                options = filter(options, (option) => {
                    return option.note
                })
            }

            options = options.map((option) => {
                let note
                let noteAttributes
                let selected = some(this.state.checked, (checked) => {
                    return checked.id === option.id
                })

                if (option.note){
                    noteAttributes = {
                        styleName: 'note',
                        onChange: this.onNoteChange.bind(this, option),
                        value: this.state.notes[option.id]
                    }

                    if (!selected){
                        noteAttributes.disabled = true
                    }

                    note = (
                        <textarea {...noteAttributes} />
                    )
                }

                return (
                    <div key={`survey-option-${option.id}`} styleName="option-container">
                        <a styleName={`option${selected ? '-selected': ''}`}
                            onClick={this.onOptionChoose.bind(this, option)}>{option.name}</a>
                        {note}
                    </div>
                )
            })
        }

        if (isRatingLoading){
            button = (
                <Button>
                    Saving...
                </Button>
            )
        } else {
            button = (
                <Button onClick={this.onSave.bind(this)}>
                    Submit
                </Button>
            )
        }

        if (data.type === 'happy'){
            paragraph = (
                <p styleName="paragraph">
                    <span>You selected</span>
                    <Emotion type={data.type} small={true} />
                    <span> - use the form below to describe what makes this meeting so good.</span>
                </p>
            )
        } else {
            paragraph = (
                <p styleName="paragraph">
                    <span>It looks like you selected</span>
                    <Emotion type={data.type} small={true} />
                    <span>for this meeting, and that’s OK. What needs improvement?</span>
                </p>
            )
        }

        return (
            <div styleName="root">
                <h2 styleName="title">{title}</h2>
                <Time date={date} recurrence={recurrence}
                    organizer={organizer} />
                <div styleName="info">
                    {paragraph}
                </div>
                <div styleName="options">
                    {options}
                </div>
                <div styleName="footer">
                    <div styleName="button-container">
                        {button}
                    </div>
                </div>
            </div>
        )
    }
}
