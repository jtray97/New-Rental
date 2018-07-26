insert into users (name, email, user_img, sub)
values ($1,$2, $3, $4)
RETURNING * 