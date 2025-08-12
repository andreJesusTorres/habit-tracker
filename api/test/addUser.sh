#!/bin/bash
# addUser.sh - Testing específico para agregar usuarios
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
    "name": "Usuario Test",
    "email": "test@example.com",
    "username": "testuser",
    "password": "12345678",
    "passwordRepeat": "12345678"
}')
echo "Respuesta: $REGISTER_RESPONSE"
