# VIEWS

Get views we can render.
GET - "/" - Home (Main Domain)

GET - "/login" - LoginForm. Redirected here if  I try to click dashboard without being logged in. 

GET - "/dashboard" Get posts where user ID = 12345 and render to page. 

"/dashboard/edit:postId" edit posta comment - PUT
"/dashboard/new"  post - POST
"/post:postId" post a comment on existing post - foreign key - userids and postid
"/login - see user activity 


Foreign key for title/content post userid foreign key