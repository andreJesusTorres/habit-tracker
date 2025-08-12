#!/bin/bash
# getGoals.sh - Testing específico para obtener metas

echo "📋 Testing de obtener metas..."
echo "=============================="



# Test: Obtener metas
echo "📋 Obteniendo metas..."
GET_GOALS_RESPONSE=$(curl -s -X GET http://localhost:3000/goals \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY")

echo "Respuesta obtener metas: $GET_GOALS_RESPONSE"
echo ""

echo "✅ Test de obtener metas completado!" 