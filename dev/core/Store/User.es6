import Alt from '../Vendor/Alt'
import { default as Action } from '../Action/User'

class User {
    constructor(){
        this.bindActions(Action)
        this.state = {}
    }

    onUpdate(data){
        this.setState({
            data
        })
    }
}

export default Alt.createStore(User)
