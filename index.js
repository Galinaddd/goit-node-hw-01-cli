const contacts = require('./contacts');

// console.log(contacts.listContacts);
// console.log(contacts.getContactById);
// console.log(contacts.removeContact);
// console.log(contacts.addContact);

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactlist = await contacts.listContacts();
      console.table(contactlist);
      break;

    case 'get':
      const contact = await contacts.getContactById(id);
      if (!contact) {
        throw new Error('Contact not found');
      }
      console.table(contact);
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.table(newContact);
      break;

    case 'remove':
      const deleteContact = await contacts.removeContact(id);
      console.table(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
