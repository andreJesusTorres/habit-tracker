#!/bin/bash
# loginUser.sh - Testing específico para login de usuarios

echo "🔑 Testing de login de usuario..."
echo "=================================="

# Test: Login usuario
echo "📝 Login usuario..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/users/auth \
-H "Content-Type: application/json" \
-d '{
    "username": "testuser",
    "password": "12345678"
}')

echo "Respuesta login: $LOGIN_RESPONSE"
echo ""

# Extraer token para uso posterior
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ ! -z "$TOKEN" ]; then
    echo "✅ Token obtenido: ${TOKEN:0:50}..."
    echo "💡 Token guardado para otros tests"
else
    echo "❌ No se pudo obtener token"
fi

echo ""
echo "✅ Test de login de usuario completado!" 