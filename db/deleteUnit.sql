delete from units
where unit_id = $1;

-- SELECT * from units
--     join users on users.id = units.owner_id
--     where owner_id = $2 AND unit_id != $1
 