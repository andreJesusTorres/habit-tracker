#!/bin/bash
# getUserDetails.sh - Testing específico para obtener detalles de usuario

echo "👤 Testing de obtener detalles de usuario..."
echo "============================================"



# Test: Obtener detalles del usuario
echo "📋 Obteniendo detalles del usuario..."
USER_DETAILS_RESPONSE=$(curl -s -X GET http://localhost:3000/users/details \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyNDMyNiwiZXhwIjoxNzQ0NjI3OTI2fQ.erS6MgJvy0C4S_C9sKAhekTyFQ2Y_dpRHAgqqXSyISY")

echo "Respuesta detalles usuario: $USER_DETAILS_RESPONSE"
echo ""

echo "✅ Test de obtener detalles de usuario completado!" 