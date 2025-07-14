export default token => {
    if (!token) {
        throw new Error('Token no proporcionado');
    }
    
    const indexFrom = token.indexOf('.')
    const indexTo = token.lastIndexOf('.')

    if (indexFrom === -1 || indexTo === -1) {
        throw new Error('Token inválido');
    }

    const payloadB64 = token.slice(indexFrom + 1, indexTo)

    const payloadJSON = atob(payloadB64)

    const payload = JSON.parse(payloadJSON)

    return payload
}

