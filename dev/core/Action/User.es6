import Alt from '../Vendor/Alt'
import { default as Source } from '../Source/User'

class User {
    constructor(){
    }

    update(data){
        return (dispatch) => {
            dispatch(data)
        }
    }
}

export default Alt.createActions(User)
