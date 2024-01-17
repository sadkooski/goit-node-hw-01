import { Command } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: refaktor
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      const allContacts = listContacts();
      console.log("Lista kontaktów:");
      console.log(allContacts);
      break;

    case "get":
      // ... id
      const foundContact = getContactById(id);
      if (foundContact) {
        console.log("Znaleziony kontakt:");
        console.log(foundContact);
      } else {
        console.log("Kontakt o podanym ID nie istnieje.");
      }
      break;

    case "add":
      // ... name email phone
      const addedContact = addContact(name, email, phone);
      console.log("Dodano nowy kontakt:");
      console.log(addedContact);
      break;

    case "remove":
      // ... id
      const removed = removeContact(id);
      if (removed) {
        console.log("Kontakt został usunięty.");
      } else {
        console.log("Nie można znaleźć kontaktu o podanym ID.");
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
