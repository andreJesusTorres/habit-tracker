#!/bin/bash
# addGoal.sh - Testing específico para agregar metas

echo "🎯 Testing de agregar meta..."
echo "============================="

# Primero crear un hábito para la meta
echo "📝 Creando hábito para meta..."
CREATE_HABIT_RESPONSE=$(curl -s -X POST http://localhost:3000/habits \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "userId": "675834522360edb20e32d41d",
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

# Test: Crear meta
echo "🎯 Creando meta..."
CREATE_GOAL_RESPONSE=$(curl -s -X POST http://localhost:3000/goals \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "userId": "675834522360edb20e32d41d",
    "habitId": "'$HABIT_ID'",
    "name": "Meta de testing",
    "objective": 30,
    "period": "monthly",
    "targetDays": 30
}')

echo "Respuesta crear meta: $CREATE_GOAL_RESPONSE"
echo ""

# Extraer ID de la meta creada
GOAL_ID=$(echo $CREATE_GOAL_RESPONSE | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)

if [ ! -z "$GOAL_ID" ]; then
    echo "✅ Meta creada con ID: $GOAL_ID"
    echo "💡 ID guardado para otros tests"
else
    echo "❌ No se pudo obtener ID de la meta"
fi

echo ""
echo "✅ Test de agregar meta completado!" 