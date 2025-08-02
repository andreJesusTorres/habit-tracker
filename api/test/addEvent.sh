#!/bin/bash
# addEvent.sh - Testing específico para agregar eventos

echo "📅 Testing de agregar evento..."
echo "==============================="

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

# Test: Crear evento
echo "📝 Creando evento..."
CREATE_EVENT_RESPONSE=$(curl -s -X POST http://localhost:3000/events \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
    "name": "Evento de testing",
    "description": "Evento para testing",
    "startDate": "'$(date +%Y-%m-%d)'T10:00:00.000Z",
    "endDate": "'$(date +%Y-%m-%d)'T11:00:00.000Z",
    "frequency": "once"
}')

echo "Respuesta crear evento: $CREATE_EVENT_RESPONSE"
echo ""

# Extraer ID del evento creado
EVENT_ID=$(echo $CREATE_EVENT_RESPONSE | tr -d '"')

if [ ! -z "$EVENT_ID" ]; then
    echo "✅ Evento creado con ID: $EVENT_ID"
    echo "💡 ID guardado para otros tests"
else
    echo "❌ No se pudo obtener ID del evento"
fi

echo ""
echo "✅ Test de agregar evento completado!" 