UPDATE users
   SET firstname = ${firstName},
       lastname = ${lastName},

  FROM othertable
 WHERE othertable.col1 = 123;