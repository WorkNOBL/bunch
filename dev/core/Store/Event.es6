import Alt from '../Vendor/Alt'
import { find, assign } from 'lodash'
import { default as Action } from '../Action/Event'
import EventEmitter from '../Vendor/EventEmitter'
import { default as Source } from '../Source/Event'


class Event {
    constructor(){
        this.bindActions(Action)

        this.state = {
        }

        this.exportAsync(Source)
    }

    onListError(data){
        this.setState({
            message: data.error,
            isListLoading: false
        })
    }

    onRatingError(){
    }

    onListLoading(){
        this.setState({
            isListLoading: true
        })
    }

    onRatingLoading(){
        this.setState({
            isRatingLoading: true
        })
    }

    onFetchList(data){
        let { events, options, status, message } = data

        this.setState({
            events,
            status,
            message,
            options,
            isListLoading: false
        })
    }

    onCreateRating(data){
        let { events } = this.state
        let event = find(events, (event) => {
            return data.event.id === event.id
        })

        if (event){
            event.stats = data.stats
            event.rating = data.rating
        }

        this.setState({
            events,
            isRatingLoading: false
        })

        EventEmitter.emit('hideModal')
    }
}

export default Alt.createStore(Event)
