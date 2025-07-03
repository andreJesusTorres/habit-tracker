curl -X PATCH http://localhost:8080/events/ \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc1MDg0MjM3OSwiZXhwIjoxNzUwODQ1OTc5fQ.uaR7vnkBgeuMm9o3LnJSIYyH72a99BCdSO7ESeUD3iQ" \
-H "Content-Type: application/json" \
-d '{
    "name": "Updated Event",
    "description": "cwdefev",
    "startDate": "2025-04-23T10:00:00.000+00:00",
    "endDate": "2026-01-23T10:00:00.000+00:00",
    "frequency": "daily",
    "eventId": "67fcdb99ff821c3b75842bc7"
}'
