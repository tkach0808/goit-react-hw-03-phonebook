import { Component } from "react";

import Section from "./Components/Section/Section";
import Form from "./Components/Form";
import Constctlist from "./Components/Constctlist";
import Filter from "./Components/Filter";
import s from "./App.module.css";

export default class BhoneBook extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const ContactsInLocalStorage = JSON.parse(localStorage.getItem("contacts"));
    if (ContactsInLocalStorage) {
      this.setState({ contacts: ContactsInLocalStorage });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState !== this.state) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (contact) =>
    this.setState(({ contacts }) => ({ contacts: [...contacts, contact] }));

  uniqueContact = (name) => {
    const { contacts } = this.state;
    const findeContact = contacts.some((contact) => contact.name === name);

    findeContact && alert("есть уже такой контакт!!!");

    return !findeContact;
  };

  hendleRemoveContact = (id) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== id),
    }));
  };

  hendleFilterChange = (filter) => {
    this.setState({ filter });
  };
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const onRemove = this.hendleRemoveContact;
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <Section title="Phonebook">
          <Form
            addContact={this.addContact}
            uniqueContact={this.uniqueContact}
          />
        </Section>
        <Section title="Contacts">
          {contacts.length === 0 ? (
            <p className={s.noContactMessage}>Тут будут ваши контакты )))</p>
          ) : (
            <div className={s.filterWrp}>
              <h4 className={s.filterTittle}>Finde contact by name</h4>
              <Filter filter={filter} onChange={this.hendleFilterChange} />
            </div>
          )}
          <Constctlist contacts={visibleContacts} onRemove={onRemove} />
        </Section>
      </>
    );
  }
}
