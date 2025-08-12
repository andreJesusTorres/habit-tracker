#!/bin/bash
# addProgress.sh - Testing específico para agregar progreso
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
    echo "Error: No se pudo crear hábito para progreso"
    exit 1
fi
CREATE_PROGRESS_RESPONSE=$(curl -s -X POST http://localhost:3000/progress \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "userId": "675834522360edb20e32d41d",
    "habitId": "'$HABIT_ID'",
    "date": "'$(date +%Y-%m-%d)'T00:00:00.000Z",
    "status": "done"
}')
PROGRESS_ID=$(echo $CREATE_PROGRESS_RESPONSE | tr -d '"')
echo "Respuesta: $GET_GOALS_RESPONSE"
