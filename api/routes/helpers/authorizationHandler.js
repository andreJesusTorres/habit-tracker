import { errors } from 'com'
import jwt from 'jsonwebtoken'

const { AuthorizationError } = errors

export default (req, res, next) => {
    try {
        const token = req.headers.authorization?.slice(7)
        const { id: userId } = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id: userId }
        next()
    } catch (error) {
        next(new AuthorizationError(error.message))
    }
}