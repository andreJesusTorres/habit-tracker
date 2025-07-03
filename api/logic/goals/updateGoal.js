import { Goal } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, goalId, data) => {
    validate.id(userId, 'userId')
    validate.id(goalId, 'goalId')
    if (data.period) validate.text(data.period, 'period')
    

    return Goal.findOne({ _id: goalId, user: userId })
        .catch(error => { throw new SystemError(error.message) })
        .then(goal => {
            if (!goal) throw new NotFoundError('Goal not found')

            Object.assign(goal, data)

            return goal.save()
                .catch(error => { throw new SystemError(error.message) })
        })
}
