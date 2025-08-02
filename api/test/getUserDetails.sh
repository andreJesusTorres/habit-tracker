#!/bin/bash
# getUserDetails.sh - Testing específico para obtener detalles de usuario

echo "👤 Testing de obtener detalles de usuario..."
echo "============================================"

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

# Test: Obtener detalles del usuario
echo "📋 Obteniendo detalles del usuario..."
USER_DETAILS_RESPONSE=$(curl -s -X GET http://localhost:3000/users/details \
-H "Authorization: Bearer $TOKEN")

echo "Respuesta detalles usuario: $USER_DETAILS_RESPONSE"
echo ""

echo "✅ Test de obtener detalles de usuario completado!" 