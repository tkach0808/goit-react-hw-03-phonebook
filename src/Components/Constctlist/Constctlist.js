import PropTypes, { exact } from "prop-types";
import s from "./Constctlist.module.css";

const Contactlist = ({ contacts, onRemove }) => {
  return (
    <ul className={s.contactListWrp}>
      {contacts.map((contact) => {
        const { id, name, number } = contact;
        return (
          <li className={s.contactItem} key={id}>
            <div className={s.contactItemText}>
              <span>{name}:</span>
              <span>{number}</span>
            </div>
            <button className={s.contactItemBtn} onClick={() => onRemove(id)}>
              delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

Contactlist.propTypes = {
  contacts: PropTypes.arrayOf(
    exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Contactlist;
