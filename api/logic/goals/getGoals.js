import { Goal } from 'dat'
import { validate, errors } from 'com'

const { SystemError } = errors

export default (userId) => {
    validate.id(userId, 'userId')

    return Goal.find({ user: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(goals => goals)
}
