UPDATE units
	SET unit_name= $2, ppd=$3, description=$4, zip_code=$5, type=$6, img1=$7, img2=$8, img3=$9, img4=$10, subtype = $11, contact_info = $12, contact_info2 = $13
WHERE unit_id = $1;

-- SELECT * from units
--     join users on users.id = units.owner_id
--     where owner_id = $11
