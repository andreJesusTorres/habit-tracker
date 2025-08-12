#!/bin/bash
# addHabit.sh - Testing específico para agregar hábitos

echo "🧪 Testing de agregar hábito..."
echo "==============================="

# Test: Crear hábito
echo "📝 Creando hábito..."
CREATE_HABIT_RESPONSE=$(curl -s -X POST http://localhost:3000/habits \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "userId": "675834522360edb20e32d41d",
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