import Ajax from 'qwest'

class User {
    fetch(){
        return new Promise((resolve, reject) => {
            Ajax.get('/api/user/profile')
                .then((xhr, response) => {
                    resolve(response)
                })
        })
    }
}

export default new User()
