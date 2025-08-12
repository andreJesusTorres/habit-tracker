#!/bin/bash
# addEvent.sh - Testing específico para agregar eventos
CREATE_EVENT_RESPONSE=$(curl -s -X POST http://localhost:3000/events \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY" \
-H "Content-Type: application/json" \
-d '{
    "userId": "675834522360edb20e32d41d",
    "name": "Meeting",
    "startDate": "2025-01-23T10:00:00.000Z",
    "description": "Discuss project",
    "endDate": null,
    "frequency": "once"
}')
echo "Respuesta: $CREATE_EVENT_RESPONSE"
