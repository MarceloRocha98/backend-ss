module.exports = app => {
    function existsOrError(value, msg) {
        if (!value) throw msg
        if (Array.isArray(value) && value.length == 0) throw msg
        if(typeof value ==='string' &&  !value.trim()) throw msg
    }

    function notExistsOrError(value, msg) {
        try {
            existsOrError(value,msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    function equalsOrError(valueA, valueB, msg) {
        if(valueA !=valueB) throw msg
    }

    function containsNumber(value, msg) {
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        console.log(value,msg)
        numbers.map(number => {
            let condition = value.indexOf(number)
     
            if (condition !==-1) throw msg
        })
    }

    return {existsOrError, notExistsOrError, equalsOrError, containsNumber }
}