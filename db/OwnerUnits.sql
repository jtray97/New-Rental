SELECT * from units
    join users on users.id = units.owner_id
    where owner_id = $1
    order by unit_id desc