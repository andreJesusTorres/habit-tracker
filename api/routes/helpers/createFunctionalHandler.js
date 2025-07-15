export default callback =>
    (req, res, next) => {
        try {
            callback(req, res)
                .then(result => {
                    // Si la función devuelve un resultado, enviarlo como respuesta JSON
                    if (result !== undefined) {
                        // Si el resultado tiene un código de estado específico, usarlo
                        if (result.statusCode) {
                            res.status(result.statusCode).json(result.data || result);
                        } else {
                            res.json(result);
                        }
                    } else {
                        // Si no hay resultado pero la operación fue exitosa, enviar respuesta 201
                        res.status(201).json({ message: 'Usuario registrado exitosamente' });
                    }
                })
                .catch(next)
        } catch (error) {
            next(error)
        }
    }