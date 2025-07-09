## Cambios

- **Endpoints**: -registro
- **Frontend**: -corregido error de tipeo en registerUser.js (metohd → method)
- **Frontend**: -corregido campo password-repeat → passwordRepeat
- **Frontend**: -hardcodeado URL de API a localhost:3000
- **Frontend**: -corregido URL de API en loginUser.js
- **Frontend**: -agregados emojis a todos los hábitos predefinidos
- **Frontend**: -mejorada interfaz de selección de hábitos con emojis
- **Frontend**: -corregido URL de API en addHabit.js, getHabits.js, deleteHabit.js, updateHabit.js
- **Backend**: -aumentado tiempo de expiración del JWT de 1h a 7d
- **Frontend**: -agregado botón de logout en Settings
- **Frontend**: -mejorado debugging en HabitSelection.jsx
- **Frontend**: -agregado mensaje de éxito al agregar hábito
- **Backend**: -permitido emojis de hasta 8 caracteres en la validación
- **Frontend**: -corregido envío de categoría 'negativos' en vez de 'hábitos negativos' para hábitos negativos 
- **Frontend**: -ahora todas las categorías de hábitos se envían exactamente como espera el backend (usando un categoryMap)
- **Frontend**: -mejorado el manejo de errores al agregar hábitos, mostrando siempre el mensaje real del backend
- **Frontend**: -tras agregar un hábito, la app recarga la página para asegurar que la lista se actualiza correctamente 