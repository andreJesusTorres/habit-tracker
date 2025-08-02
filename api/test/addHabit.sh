#!/bin/bash
# addHabit.sh - Testing específico para agregar hábitos

echo "🧪 Testing de agregar hábito..."
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

# Test: Crear hábito
echo "📝 Creando hábito..."
CREATE_HABIT_RESPONSE=$(curl -s -X POST http://localhost:3000/habits \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
    "name": "Hábito de testing",
    "category": "actividad física",
    "subcategory": "cardio",
    "emoji": "💪"
}')

echo "Respuesta crear hábito: $CREATE_HABIT_RESPONSE"
echo ""

# Extraer ID del hábito creado
HABIT_ID=$(echo $CREATE_HABIT_RESPONSE | grep -o '"habitId":"[^"]*"' | cut -d'"' -f4)

if [ ! -z "$HABIT_ID" ]; then
    echo "✅ Hábito creado con ID: $HABIT_ID"
    echo "💡 ID guardado para otros tests"
else
    echo "❌ No se pudo obtener ID del hábito"
fi

echo ""
echo "✅ Test de agregar hábito completado!" 