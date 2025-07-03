curl -X POST http://localhost:8080/progress \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc0MTM0NjY0NywiZXhwIjoxNzQxMzUwMjQ3fQ.FofL_IxQcA7-otBbNnn8QXQLkiMGsPAm4MT5LUTWL_M" \
-H "Content-Type: application/json" \
-d '{
    "userId": "675834522360edb20e32d41d", 
    "habitId": "675834522360edb20e32d420",
    "date": "2025-01-23T00:00:00.000Z",
    "status": "missed"
}'
