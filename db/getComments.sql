select r.*, u.firstname as "userFirstName", u.lastname as "userLastName"
from reviews r join users u on u.id = r.user_id
where r.parkid = ${parkid}