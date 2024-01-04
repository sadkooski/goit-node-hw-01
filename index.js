const fs = require("fs").promises;
const { program } = require("commander");
const contacts = require("./contacts");

console.log("test test");
console.log(contacts.addContact("Oskar", "mrproskar@gmail.com", "123456789"));
