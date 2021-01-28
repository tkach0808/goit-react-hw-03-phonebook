import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

import s from "./Form.module.css";

class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  static propTypes = {
    addContact: PropTypes.func.isRequired,
    uniqueContact: PropTypes.func.isRequired,
  };

  hendleChangeForm = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  hendleSubmitForm = (e) => {
    e.preventDefault();

    const { name, number } = this.state;
    const { addContact } = this.props;
    const isvalidationForm = this.validationForm();

    if (!isvalidationForm) return;
    // console.log({ id: uuidv4(), name, number });

    addContact({ id: uuidv4(), name, number });
    this.restartForm();
  };

  validationForm = () => {
    const { name, number } = this.state;
    const { uniqueContact } = this.props;

    if (!name || !number) {
      alert("Чтото вы забыли указать");
      return false;
    }
    return uniqueContact(name);
  };
  restartForm = () => this.setState({ name: "", number: "" });
  render() {
    const { name, number } = this.state;
    return (
      <form className={s.contactForm} onSubmit={this.hendleSubmitForm}>
        <label>
          <input
            name="name"
            value={name}
            type="text"
            placeholder="Name..."
            onChange={this.hendleChangeForm}
          ></input>
        </label>
        <label>
          <input
            name="number"
            value={number}
            type="tel"
            placeholder="Phone..."
            onChange={this.hendleChangeForm}
          ></input>
        </label>
        <button className={s.addContactBtn} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

export default Form;
