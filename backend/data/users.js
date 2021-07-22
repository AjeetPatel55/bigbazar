import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Pratik Choudhary',
    email: 'pratik@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'pooja',
    email: 'pooja@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users