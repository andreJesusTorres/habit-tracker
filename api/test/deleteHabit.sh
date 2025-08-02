#!/bin/bash
# deleteHabit.sh - Testing específico para eliminar hábitos

echo "🗑️ Testing de eliminar hábito..."
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

# Primero crear un hábito para eliminarlo
echo "📝 Creando hábito para eliminar..."
CREATE_HABIT_RESPONSE=$(curl -s -X POST http://localhost:3000/habits \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
    "name": "Hábito para eliminar",
    "category": "actividad física",
    "subcategory": "cardio",
    "emoji": "💪"
}')

HABIT_ID=$(echo $CREATE_HABIT_RESPONSE | grep -o '"habitId":"[^"]*"' | cut -d'"' -f4)

if [ -z "$HABIT_ID" ]; then
    echo "❌ Error: No se pudo crear hábito para eliminar"
    exit 1
fi

echo "✅ Hábito creado con ID: $HABIT_ID"
echo ""

# Test: Eliminar hábito
echo "🗑️ Eliminando hábito..."
DELETE_HABIT_RESPONSE=$(curl -s -X DELETE http://localhost:3000/habits/$HABIT_ID \
-H "Authorization: Bearer $TOKEN")

echo "Respuesta eliminar hábito: $DELETE_HABIT_RESPONSE"
echo ""

echo "✅ Test de eliminar hábito completado!" 