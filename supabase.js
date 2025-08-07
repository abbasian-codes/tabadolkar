https://supabase.com/dashboard/project/boblzlcjucdvbcqtmjqm/api

https://boblzlcjucdvbcqtmjqm.supabase.co

https://supabase.com/dashboard/project/boblzlcjucdvbcqtmjqm/api?page=users-management

//User signup
// curl -X POST 'https://boblzlcjucdvbcqtmjqm.supabase.co/auth/v1/signup' \
// -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvYmx6bGNqdWNkdmJjcXRtanFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNjI4NzcsImV4cCI6MjA2ODgzODg3N30.Ji6vSpgSOyRwHBN-U8EkpOswCZNHfOxnpAORYtGAw4Y" \
// -H "Content-Type: application/json" \
// -d '{
//   "email": "someone@email.com",
//   "password": "JrcJTqIInIIgnVJEQSWK"
// }'
curl -X POST 'https://your-project.supabase.co/auth/v1/signup' \
-H "apikey: YOUR_ANON_KEY" \
-H "Authorization: Bearer YOUR_ANON_KEY" \
-H "Content-Type: application/json" \
-d '{
  "email": "someone@email.com",
  "password": "your_password_here"
}'