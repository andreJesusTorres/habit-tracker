curl -X PUT http://localhost:8080/progress/67cae2c60560350688e1eff1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzU4MzQ1MjIzNjBlZGIyMGUzMmQ0MWQiLCJyb2xlIjoicmVndWxhciIsImlhdCI6MTc1MDg0MjM3OSwiZXhwIjoxNzUwODQ1OTc5fQ.uaR7vnkBgeuMm9o3LnJSIYyH72a99BCdSO7ESeUD3iQ" \
-H "Content-Type: application/json" \
-d '{
    "status": "done"
}'
