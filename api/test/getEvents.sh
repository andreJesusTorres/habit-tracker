#!/bin/bash
# getEvents.sh - Testing específico para obtener eventos

echo "📋 Testing de obtener eventos..."
echo "================================"

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

# Test: Obtener eventos
echo "📋 Obteniendo eventos..."
GET_EVENTS_RESPONSE=$(curl -s -X GET http://localhost:3000/events \
-H "Authorization: Bearer $TOKEN")

echo "Respuesta obtener eventos: $GET_EVENTS_RESPONSE"
echo ""

echo "✅ Test de obtener eventos completado!" 