#!/bin/bash

curl -X POST http://localhost:8080/users/register \
-H "Content-Type: application/json" \
-d '{
    "name": "JuanCarlo",
    "email": "Juanc@example.com",
    "username": "JuanCar",
    "password": "password123",
    "passwordRepeat": "password123"
}'
