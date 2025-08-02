#!/bin/bash
# deleteEvent.sh - Testing específico para eliminar eventos

echo "🗑️ Testing de eliminar evento..."
echo "================================="

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

# Primero crear un evento para eliminar
echo "📝 Creando evento para eliminar..."
CREATE_EVENT_RESPONSE=$(curl -s -X POST http://localhost:3000/events \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
    "name": "Evento para eliminar",
    "description": "Evento para testing",
    "startDate": "'$(date +%Y-%m-%d)'T10:00:00.000Z",
    "endDate": "'$(date +%Y-%m-%d)'T11:00:00.000Z",
    "frequency": "once"
}')

EVENT_ID=$(echo $CREATE_EVENT_RESPONSE | tr -d '"')

if [ -z "$EVENT_ID" ]; then
    echo "❌ Error: No se pudo crear evento para eliminar"
    exit 1
fi

echo "✅ Evento creado con ID: $EVENT_ID"
echo ""

# Test: Eliminar evento
echo "🗑️ Eliminando evento..."
DELETE_EVENT_RESPONSE=$(curl -s -X DELETE http://localhost:3000/events/$EVENT_ID \
-H "Authorization: Bearer $TOKEN")

echo "Respuesta eliminar evento: $DELETE_EVENT_RESPONSE"
echo ""

echo "✅ Test de eliminar evento completado!" 