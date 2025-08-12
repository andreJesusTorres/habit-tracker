#!/bin/bash
# getProgress.sh - Testing específico para obtener progreso

echo "📋 Testing de obtener progreso..."
echo "=================================="



# Test: Obtener progreso
echo "📋 Obteniendo progreso..."
GET_PROGRESS_RESPONSE=$(curl -s -X GET http://localhost:3000/progress \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY")

echo "Respuesta obtener progreso: $GET_PROGRESS_RESPONSE"
echo ""

echo "✅ Test de obtener progreso completado!" 