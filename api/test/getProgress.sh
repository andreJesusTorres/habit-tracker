#!/bin/bash
# getProgress.sh - Testing específico para obtener progreso

echo "📋 Testing de obtener progreso..."
echo "=================================="

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

# Test: Obtener progreso
echo "📋 Obteniendo progreso..."
GET_PROGRESS_RESPONSE=$(curl -s -X GET http://localhost:3000/progress \
-H "Authorization: Bearer $TOKEN")

echo "Respuesta obtener progreso: $GET_PROGRESS_RESPONSE"
echo ""

echo "✅ Test de obtener progreso completado!" 