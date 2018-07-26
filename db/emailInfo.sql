select * from units
    join users
        on units.owner_id = users.id
    where unit_id = $1
        