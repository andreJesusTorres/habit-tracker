#!/bin/bash
# addProgress.sh - Testing específico para agregar progreso

echo "📊 Testing de agregar progreso..."
echo "=================================="

# Primero crear un hábito para el progreso
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

# Test: Crear progreso
echo "📈 Creando progreso..."
CREATE_PROGRESS_RESPONSE=$(curl -s -X POST http://localhost:3000/progress \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "userId": "675834522360edb20e32d41d",
    "habitId": "'$HABIT_ID'",
    "date": "'$(date +%Y-%m-%d)'T00:00:00.000Z",
    "status": "done"
}')

echo "Respuesta crear progreso: $CREATE_PROGRESS_RESPONSE"
echo ""

# Extraer ID del progreso creado
PROGRESS_ID=$(echo $CREATE_PROGRESS_RESPONSE | tr -d '"')

if [ ! -z "$PROGRESS_ID" ]; then
    echo "✅ Progreso creado con ID: $PROGRESS_ID"
    echo "💡 ID guardado para otros tests"
else
    echo "❌ No se pudo obtener ID del progreso"
fi

echo ""
echo "✅ Test de agregar progreso completado!" 