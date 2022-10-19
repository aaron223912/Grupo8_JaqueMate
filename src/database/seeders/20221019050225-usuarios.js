'use strict';
const {hashSync} =require("bcryptjs")
const users = [
  {
    name: "Mariano",
    surname: "Garzon Sergio",
    email: "bemja28091991@gmail.com",
    password: hashSync("123123",10),
    birthday: null,
    genderId: 1,
    rolId:1,
    createdAt: new Date()
  },
  {
    name: "Mauro",
    surname: "Mundanu",
    email: "mundanu@gmail.com",
    password: hashSync("123123",10),
    birthday: null,
    genderId: 1,
    rolId:2,
    createdAt: new Date()
  },
  {
    name: "User",
    surname: "User",
    email: "User@gmail.com",
    password: hashSync("123123",10),
    birthday: null,
    genderId: 1,
    rolId:3,
    createdAt: new Date()
  }
]
  
module.exports = {
  async up (queryInterface, Sequelize) {
    
     
     await queryInterface.bulkInsert('Users', users, {});
    
  },

  async down (queryInterface, Sequelize) {
   
     
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
