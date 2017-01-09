export default {
    getCSRFToken(){
        return document.querySelector('meta[name="csrf-token"]').content
    },
    buildAjaxObject(type, data){
        return {
            authenticity_token: this.getCSRFToken(),
            [type]: data
        }
    },
    numberToDay(number){
        switch (number){
        case 0:
            return 'Su'
        case 1:
            return 'M'
        case 2:
            return 'Tu'
        case 3:
            return 'We'
        case 4:
            return 'Th'
        case 5:
            return 'Fr'
        case 6:
            return 'Sa'
        }
    },
    createAllWeek(){
        return [0, 1, 2, 3, 4, 5, 6].map((index) => {
            return this.numberToDay(index)
        })
    }
}