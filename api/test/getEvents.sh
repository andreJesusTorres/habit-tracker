#!/bin/bash
# getEvents.sh - Testing específico para obtener eventos

echo "📋 Testing de obtener eventos..."
echo "================================"

# Test: Obtener eventos
echo "📋 Obteniendo eventos..."
GET_EVENTS_RESPONSE=$(curl -s -X GET http://localhost:3000/events \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY")

echo "Respuesta obtener eventos: $GET_EVENTS_RESPONSE"
echo ""

echo "✅ Test de obtener eventos completado!" 