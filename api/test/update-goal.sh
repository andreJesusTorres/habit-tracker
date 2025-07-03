curl -X PUT http://localhost:8080/goals/ \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc1MDg0MjM3OSwiZXhwIjoxNzUwODQ1OTc5fQ.uaR7vnkBgeuMm9o3LnJSIYyH72a99BCdSO7ESeUD3iQ" \
-H "Content-Type: application/json" \
-d '{
    "name": "correr",
    "objective": "27",
    "period": "weekly",
    "goalId": "67c9940e6853abea53944a25"
}'
