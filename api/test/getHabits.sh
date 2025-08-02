#!/bin/bash
# getHabits.sh - Testing específico para obtener hábitos

echo "📋 Testing de obtener hábitos..."
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

# Test: Obtener hábitos
echo "📋 Obteniendo hábitos..."
GET_HABITS_RESPONSE=$(curl -s -X GET http://localhost:3000/habits \
-H "Authorization: Bearer $TOKEN")

echo "Respuesta obtener hábitos: $GET_HABITS_RESPONSE"
echo ""

echo "✅ Test de obtener hábitos completado!" 