#!/bin/bash
# addUser.sh - Testing específico para agregar usuarios

echo "👤 Testing de agregar usuario..."
echo "================================"

# Test: Registrar usuario
echo "📝 Registrando usuario..."
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
    "name": "Usuario Test",
    "email": "test@example.com",
    "username": "testuser",
    "password": "12345678",
    "passwordRepeat": "12345678"
}')

echo "Respuesta registro: $REGISTER_RESPONSE"
echo ""

echo "✅ Test de agregar usuario completado!" 