curl -X POST http://localhost:8080/habits/ \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0NDYyMzcxNywiZXhwIjoxNzQ0NjI3MzE3fQ.QO6pXV1TUwyZYim9N99ZRAhCSyjIQdEyTE-c6RtVeBw" \
-H "Content-Type: application/json" \
-d '{
    "userId":"675834522360edb20e32d41d",
    "name": "Comer bien",
    "category": "actividad fisica",
    "subcategory": "ir al gimnasio 56 horas",
    "emoji": "⭐"
}'
