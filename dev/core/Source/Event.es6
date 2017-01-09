import Ajax from 'qwest'
import { default as Action } from '../Action/Event'

export default {
    fetchList(){
        return {
            remote(){
                return new Promise((resolve, reject) => {
                    Ajax.get('/api/events/list')
                        .then((xhr, response) => {
                            resolve(response)
                        })
                        .catch((error, xhr, response) => {
                            reject(response)
                        })
                })
            },
            local(state){
                return state.events ? state : null
            },
            success: Action.fetchList,
            error: Action.listError,
            loading: Action.listLoading
        }
    },
    createRating(obj){
        return {
            remote(state, obj){
                return new Promise((resolve, reject) => {
                    Ajax.post('/api/rating/create', obj)
                        .then((xhr, response) => {
                            resolve(response)
                        })
                        .catch((error, xhr, response) => {
                            reject(response)
                        })
                })
            },
            local(){
                return null
            },
            success: Action.createRating,
            error: Action.ratingError,
            loading: Action.ratingLoading
        }
    }
}
