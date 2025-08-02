#!/bin/bash
# getGoals.sh - Testing específico para obtener metas

echo "📋 Testing de obtener metas..."
echo "=============================="

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

# Test: Obtener metas
echo "📋 Obteniendo metas..."
GET_GOALS_RESPONSE=$(curl -s -X GET http://localhost:3000/goals \
-H "Authorization: Bearer $TOKEN")

echo "Respuesta obtener metas: $GET_GOALS_RESPONSE"
echo ""

echo "✅ Test de obtener metas completado!" 