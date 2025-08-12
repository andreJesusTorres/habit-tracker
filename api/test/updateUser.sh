#!/bin/bash
# updateUser.sh - Testing específico para actualizar usuarios

echo "✏️ Testing de actualizar usuario..."
echo "===================================="


# Test: Actualizar usuario
echo "📝 Actualizando usuario..."
UPDATE_RESPONSE=$(curl -s -X PUT http://localhost:3000/users/update \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "userId": "675834522360edb20e32d41d",
    "name": "Usuario Test Actualizado",
    "email": "test.updated@example.com"
}')

echo "Respuesta actualizar usuario: $UPDATE_RESPONSE"
echo ""

echo "✅ Test de actualizar usuario completado!" 