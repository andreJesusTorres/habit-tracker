#!/bin/bash
# deleteHabit.sh - Testing específico para eliminar hábitos

echo "🗑️ Testing de eliminar hábito..."
echo "================================="


# Primero crear un hábito para eliminarlo
echo "📝 Creando hábito para eliminar..."
CREATE_HABIT_RESPONSE=$(curl -s -X POST http://localhost:3000/habits \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "userId": "675834522360edb20e32d41d",
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
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY")

echo "Respuesta eliminar hábito: $DELETE_HABIT_RESPONSE"
echo ""

echo "✅ Test de eliminar hábito completado!" 