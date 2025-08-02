#!/bin/bash
# addProgress.sh - Testing específico para agregar progreso

echo "📊 Testing de agregar progreso..."
echo "=================================="

# Obtener token primero
echo "🔑 Obteniendo token..."
TOKEN_RESPONSE=$(curl -s -X POST http://localhost:3000/users/auth \
-H "Content-Type: application/json" \
-d '{
    "username": "testuser",
    "password": "12345678"
}')

TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "❌ Error: No se pudo obtener token"
    exit 1
fi

echo "✅ Token obtenido: ${TOKEN:0:50}..."
echo ""

# Primero crear un hábito para el progreso
echo "📝 Creando hábito para progreso..."
CREATE_HABIT_RESPONSE=$(curl -s -X POST http://localhost:3000/habits \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
    "name": "Hábito para progreso",
    "category": "desarrollo personal",
    "subcategory": "estudio",
    "emoji": "📚"
}')

HABIT_ID=$(echo $CREATE_HABIT_RESPONSE | grep -o '"habitId":"[^"]*"' | cut -d'"' -f4)

if [ -z "$HABIT_ID" ]; then
    echo "❌ Error: No se pudo crear hábito para progreso"
    exit 1
fi

echo "✅ Hábito creado con ID: $HABIT_ID"
echo ""

# Test: Crear progreso
echo "📈 Creando progreso..."
CREATE_PROGRESS_RESPONSE=$(curl -s -X POST http://localhost:3000/progress \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
    "habitId": "'$HABIT_ID'",
    "date": "'$(date +%Y-%m-%d)'T00:00:00.000Z",
    "status": "done"
}')

echo "Respuesta crear progreso: $CREATE_PROGRESS_RESPONSE"
echo ""

# Extraer ID del progreso creado
PROGRESS_ID=$(echo $CREATE_PROGRESS_RESPONSE | tr -d '"')

if [ ! -z "$PROGRESS_ID" ]; then
    echo "✅ Progreso creado con ID: $PROGRESS_ID"
    echo "💡 ID guardado para otros tests"
else
    echo "❌ No se pudo obtener ID del progreso"
fi

echo ""
echo "✅ Test de agregar progreso completado!" 