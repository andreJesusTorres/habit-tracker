curl -X PATCH http://localhost:8080/habits/675834522360edb20e32d420 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0OTgwNDIyMiwiZXhwIjoxNzQ5ODA3ODIyfQ.ldXCmFpL7_svdrrz6AHAU4q8XM1hW1klbYwG6VvHP-Y" \
-H "Content-Type: application/json" \
-d '{
    "userId": "675834522360edb20e32d41d",
    "name": "Morning Exercise",
    "emoji": "🏃‍♂️"
}' -v