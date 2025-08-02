#!/bin/bash
# deleteGoal.sh - Testing específico para eliminar metas

echo "🗑️ Testing de eliminar meta..."
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

# Primero crear un hábito y meta para eliminar
echo "📝 Creando hábito para meta..."
CREATE_HABIT_RESPONSE=$(curl -s -X POST http://localhost:3000/habits \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
    "name": "Hábito para meta",
    "category": "salud y bienestar",
    "subcategory": "ejercicio",
    "emoji": "🏃"
}')

HABIT_ID=$(echo $CREATE_HABIT_RESPONSE | grep -o '"habitId":"[^"]*"' | cut -d'"' -f4)

if [ -z "$HABIT_ID" ]; then
    echo "❌ Error: No se pudo crear hábito para meta"
    exit 1
fi

echo "✅ Hábito creado con ID: $HABIT_ID"
echo ""

echo "🎯 Creando meta para eliminar..."
CREATE_GOAL_RESPONSE=$(curl -s -X POST http://localhost:3000/goals \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
    "habitId": "'$HABIT_ID'",
    "name": "Meta para eliminar",
    "objective": 30,
    "period": "monthly",
    "targetDays": 30
}')

GOAL_ID=$(echo $CREATE_GOAL_RESPONSE | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)

if [ -z "$GOAL_ID" ]; then
    echo "❌ Error: No se pudo crear meta para eliminar"
    exit 1
fi

echo "✅ Meta creada con ID: $GOAL_ID"
echo ""

# Test: Eliminar meta
echo "🗑️ Eliminando meta..."
DELETE_GOAL_RESPONSE=$(curl -s -X DELETE http://localhost:3000/goals/$GOAL_ID \
-H "Authorization: Bearer $TOKEN")

echo "Respuesta eliminar meta: $DELETE_GOAL_RESPONSE"
echo ""

# Limpiar hábito también
echo "🧹 Eliminando hábito..."
DELETE_HABIT_RESPONSE=$(curl -s -X DELETE http://localhost:3000/habits/$HABIT_ID \
-H "Authorization: Bearer $TOKEN")

echo "Respuesta eliminar hábito: $DELETE_HABIT_RESPONSE"
echo ""

echo "✅ Test de eliminar meta completado!" 