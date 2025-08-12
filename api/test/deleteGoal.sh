#!/bin/bash
# deleteGoal.sh - Testing específico para eliminar metas

echo "🗑️ Testing de eliminar meta..."
echo "=============================="


# Primero crear un hábito y meta para eliminar
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

echo "🎯 Creando meta para eliminar..."
CREATE_GOAL_RESPONSE=$(curl -s -X POST http://localhost:3000/goals \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "habitId": "'$HABIT_ID'",
    "userId": "675834522360edb20e32d41d",
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
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY")

echo "Respuesta eliminar meta: $DELETE_GOAL_RESPONSE"
echo ""

# Limpiar hábito también
echo "🧹 Eliminando hábito..."
DELETE_HABIT_RESPONSE=$(curl -s -X DELETE http://localhost:3000/habits/$HABIT_ID \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY")

echo "Respuesta eliminar hábito: $DELETE_HABIT_RESPONSE"
echo ""

echo "✅ Test de eliminar meta completado!" 