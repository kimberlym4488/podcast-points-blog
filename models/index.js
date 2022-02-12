const User = require('./User');

//user has many posts

//posts belongTo User
//post has the foreign key - post table will have user_id foreign key. Post can point back to the user that it belongs to. 

//User hasMany comments
//Comments belongTo user (comments table has the comment.user_id foreign key)

//Posts has many comments
//Comments belongTo Post (Comment.post_id foreign key)



module.exports = { User, Project }