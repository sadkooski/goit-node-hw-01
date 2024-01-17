import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

function listContacts() {
  // ...twój kod
  fs.readFile(contactsPath)
    .then((data) => {
      console.log("Contacts to string:", data.toString());
      return data.toString();
    })
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  // ...twój kod
  fs.readFile(contactsPath).then((data) =>
    JSON.parse(data).forEach((contact) => {
      if (contact.id === contactId) {
        console.log(contact);
      }
    })
  );
}

function removeContact(contactId) {
  // ...twój kod
  let updatedContacts;
  return fs
    .readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const indexToRemove = contacts.findIndex(
        (contact) => contact.id === contactId
      );
      if (indexToRemove !== -1) {
        contacts.splice(indexToRemove, 1);
        updatedContacts = JSON.stringify(contacts);
        console.log("before write", updatedContacts);

        return fs.writeFile(contactsPath, updatedContacts);
      } else {
        console.log("Kontakt o podanym ID nie został znaleziony.");
      }
    })
    .then(() => {
      console.log("after write");
    })
    .catch((error) => {
      console.error("Wystąpił błąd:", error);
    });
}

function addContact(name, email, phone) {
  // ...twój kod
  let contactExists = false;

  return fs
    .readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      contacts.forEach((contact) => {
        if (
          contact.name === name &&
          contact.email === email &&
          contact.phone === phone
        ) {
          contactExists = true;
          return console.log("Kontakt z podanymi danymi już istnieje!");
        }
      });
      if (!contactExists) {
        const newContact = {
          id: "123",
          name: name,
          email: email,
          phone: phone,
        };
        contacts.push(newContact);
        const updatedContacts = JSON.stringify(contacts);
        console.log("after add", updatedContacts);
        return fs.writeFile(contactsPath, updatedContacts);
      }
    })
    .catch((error) => {
      console.error("Wystąpił błąd:", error);
    });
}

export { listContacts, getContactById, removeContact, addContact };
