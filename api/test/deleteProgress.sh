#!/bin/bash
# deleteProgress.sh - Testing específico para eliminar progreso

echo "🗑️ Testing de eliminar progreso..."
echo "=================================="


# Primero crear un hábito y progreso para eliminar
echo "📝 Creando hábito para progreso..."
CREATE_HABIT_RESPONSE=$(curl -s -X POST http://localhost:3000/habits \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "userId": "675834522360edb20e32d41d",
    "name": "Hábito para progreso",
    "category": "desarrollo personal",
    "subcategory": "estudio",
    "emoji": "📚"
}')

HABIT_ID=$(echo $CREATE_HABIT_RESPONSE | grep -o '"habitId":"[^"]*"' | cut -d'"' -f4)

if [ -z "$HABIT_ID" ]; then
    echo "❌ Error: No se pudo crear hábito para progreso"
    exit 1
fi

echo "✅ Hábito creado con ID: $HABIT_ID"
echo ""

echo "📈 Creando progreso para eliminar..."
CREATE_PROGRESS_RESPONSE=$(curl -s -X POST http://localhost:3000/progress \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "habitId": "'$HABIT_ID'",
    "date": "'$(date +%Y-%m-%d)'T00:00:00.000Z",
    "status": "done"
}')

PROGRESS_ID=$(echo $CREATE_PROGRESS_RESPONSE | tr -d '"')

if [ -z "$PROGRESS_ID" ]; then
    echo "❌ Error: No se pudo crear progreso para eliminar"
    exit 1
fi

echo "✅ Progreso creado con ID: $PROGRESS_ID"
echo ""

# Test: Eliminar progreso
echo "🗑️ Eliminando progreso..."
DELETE_PROGRESS_RESPONSE=$(curl -s -X DELETE http://localhost:3000/progress/$PROGRESS_ID \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "habitId": "'$HABIT_ID'"
}')

echo "Respuesta eliminar progreso: $DELETE_PROGRESS_RESPONSE"
echo ""

# Limpiar hábito también
echo "🧹 Eliminando hábito..."
DELETE_HABIT_RESPONSE=$(curl -s -X DELETE http://localhost:3000/habits/$HABIT_ID \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY")

echo "Respuesta eliminar hábito: $DELETE_HABIT_RESPONSE"
echo ""

echo "✅ Test de eliminar progreso completado!" 