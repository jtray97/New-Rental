insert into units
    (type, unit_name, description, owner_id, ppd, zip_code, img1, img2, img3, img4, subtype, contact_info, contact_info2)
values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
returning *;