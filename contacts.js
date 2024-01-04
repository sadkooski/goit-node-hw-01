const fs = require("fs").promises;
const { program } = require("commander");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  // ...twój kod
  fs.readFile(contactsPath)
    .then((data) => console.log(data.toString()))
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
  fs.readFile(contactsPath)
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

  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      console.log("1", contacts);
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
        console.log("2", updatedContacts);
        return fs.writeFile(contactsPath, updatedContacts);
      }
    })
    .then(() => {
      console.log("after write");
    })
    .catch((error) => {
      console.error("Wystąpił błąd:", error);
    });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// const fs = require('fs');
// const path = require('path');

// function removeContact(contactId) {
//   const contactsPath = path.join(__dirname, 'contacts.json');

//   // Odczytaj zawartość pliku contacts.json
//   fs.readFile(contactsPath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Błąd odczytu pliku:', err);
//       return;
//     }

//     try {
//       // Parsowanie danych z pliku JSON do tablicy kontaktów
//       const contacts = JSON.parse(data);

//       // Znajdź indeks kontaktu do usunięcia
//       const indexToRemove = contacts.findIndex(contact => contact.id === contactId);

//       if (indexToRemove !== -1) {
//         // Usuń kontakt z tablicy
//         contacts.splice(indexToRemove, 1);

//         // Konwertuj tablicę kontaktów z powrotem do formatu JSON
//         const updatedContacts = JSON.stringify(contacts, null, 2);

//         // Zapisz zaktualizowane dane do pliku contacts.json
//         fs.writeFile(contactsPath, updatedContacts, 'utf8', err => {
//           if (err) {
//             console.error('Błąd zapisu do pliku:', err);
//             return;
//           }
//           console.log('Kontakt został usunięty.');
//         });
//       } else {
//         console.log('Kontakt o podanym ID nie został znaleziony.');
//       }
//     } catch (error) {
//       console.error('Błąd parsowania danych JSON:', error);
//     }
//   });
// }

// // Wywołanie funkcji removeContact z id kontaktu do usunięcia
// removeContact('ID_KONTAKTU_DO_USUNIĘCIA');
