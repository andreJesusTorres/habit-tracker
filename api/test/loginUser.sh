#!/bin/bash
# loginUser.sh - Testing específico para login de usuarios
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/users/auth \
-H "Content-Type: application/json" \
-d '{
    "username": "testuser",
    "password": "12345678"
}')
echo "Respuesta: $LOGIN_RESPONSE"
