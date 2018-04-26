UPDATE users
   SET firstname = ${firstName},
       lastname = ${lastName},
       email = ${email},
       password = ${password},
       city = ${city},
       state = ${state},
       zip = ${zip}
 WHERE id = ${id};