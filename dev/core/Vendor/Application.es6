import User from '../Source/User'
import { default as Action } from '../Action/User'

export default class Application {
    constructor(){
        return new Promise((resolve, reject) => {
            User.fetch()
                .then((data) => {
                    Action.update(data)
                    resolve(data)
                })
        })
    }
}
