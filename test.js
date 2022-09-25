const bcrypt= require("bcrypt");
const res = bcrypt.compareSync("Rayhan@123", "$2b$10$fAz6Q5O7uYILmhffZx5cAu03YCHxYsaCEXrBZKJu9Td6xPfNYD//2")

console.log(res)
