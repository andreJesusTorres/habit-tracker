#!/bin/bash
# deleteEvent.sh - Testing específico para eliminar eventos
CREATE_EVENT_RESPONSE=$(curl -s -X POST http://localhost:3000/events \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "userId": "675834522360edb20e32d41d",
    "name": "Evento para eliminar",
    "description": "Evento para testing",
    "startDate": "'$(date +%Y-%m-%d)'T10:00:00.000Z",
    "endDate": "'$(date +%Y-%m-%d)'T11:00:00.000Z",
    "frequency": "once"
}')
EVENT_ID=$(echo $CREATE_EVENT_RESPONSE | tr -d '"')
if [ -z "$EVENT_ID" ]; then
    echo "Error: No se pudo crear evento para eliminar"
    exit 1
fi
DELETE_EVENT_RESPONSE=$(curl -s -X DELETE http://localhost:3000/events/$EVENT_ID \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY")
echo "Respuesta: $GET_GOALS_RESPONSE"
