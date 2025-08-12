#!/bin/bash
# getHabits.sh - Testing específico para obtener hábitos

echo "📋 Testing de obtener hábitos..."
echo "================================"



# Test: Obtener hábitos
echo "📋 Obteniendo hábitos..."
GET_HABITS_RESPONSE=$(curl -s -X GET http://localhost:3000/habits \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY")

echo "Respuesta obtener hábitos: $GET_HABITS_RESPONSE"
echo ""

echo "✅ Test de obtener hábitos completado!" 