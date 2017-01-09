import { assign } from 'lodash'
import Alt from '../Vendor/Alt'
import { default as Source } from '../Source/Event'

class Event {
    constructor(){
    }

    listError(data){
        return (dispatch) => {
            dispatch(data)
        }
    }

    ratingError(data){
        return (dispatch) => {
            dispatch(data)
        }
    }

    listLoading(){
        return (dispatch) => {
            dispatch()
        }
    }

    ratingLoading(){
        return (dispatch) => {
            dispatch()
        }
    }

    fetchList(data){
        return (dispatch) => {
            dispatch(data)
        }
    }

    createRating(data){
        return (dispatch) => {
            dispatch(data)
        }
    }
}

export default Alt.createActions(Event)
