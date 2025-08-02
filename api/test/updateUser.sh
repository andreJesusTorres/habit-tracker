#!/bin/bash
# updateUser.sh - Testing específico para actualizar usuarios

echo "✏️ Testing de actualizar usuario..."
echo "===================================="

# Obtener token primero
echo "🔑 Obteniendo token..."
TOKEN_RESPONSE=$(curl -s -X POST http://localhost:3000/users/auth \
-H "Content-Type: application/json" \
-d '{
    "username": "testuser",
    "password": "12345678"
}')

TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "❌ Error: No se pudo obtener token"
    exit 1
fi

echo "✅ Token obtenido: ${TOKEN:0:50}..."
echo ""

# Test: Actualizar usuario
echo "📝 Actualizando usuario..."
UPDATE_RESPONSE=$(curl -s -X PUT http://localhost:3000/users/update \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
    "name": "Usuario Test Actualizado",
    "email": "test.updated@example.com"
}')

echo "Respuesta actualizar usuario: $UPDATE_RESPONSE"
echo ""

echo "✅ Test de actualizar usuario completado!" 