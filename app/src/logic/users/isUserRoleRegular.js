import { extractPayloadFromJWT } from '../../util'

export default () => extractPayloadFromJWT(localStorage.getItem('token')).role === 'regular'