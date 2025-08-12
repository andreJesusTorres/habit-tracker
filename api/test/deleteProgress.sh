#!/bin/bash
# deleteProgress.sh - Testing específico para eliminar progreso
CREATE_HABIT_RESPONSE=$(curl -s -X POST http://localhost:3000/habits \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "userId": "675834522360edb20e32d41d",
    "name": "Hábito para progreso",
    "category": "desarrollo personal",
    "subcategory": "estudio",
    "emoji": "book"
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
    "habitId": "'$HABIT_ID'",
    "date": "'$(date +%Y-%m-%d)'T00:00:00.000Z",
    "status": "done"
}')
PROGRESS_ID=$(echo $CREATE_PROGRESS_RESPONSE | tr -d '"')
if [ -z "$PROGRESS_ID" ]; then
    echo "Error: No se pudo crear progreso para eliminar"
    exit 1
fi
DELETE_PROGRESS_RESPONSE=$(curl -s -X DELETE http://localhost:3000/progress/$PROGRESS_ID \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "habitId": "'$HABIT_ID'"
}')
# Limpiar hábito también
DELETE_HABIT_RESPONSE=$(curl -s -X DELETE http://localhost:3000/habits/$HABIT_ID \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY")
echo "Respuesta: $GET_GOALS_RESPONSE"
