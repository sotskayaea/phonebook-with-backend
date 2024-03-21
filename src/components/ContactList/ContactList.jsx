import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSliceReducer';
import style from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const filteredContacts = contacts.filter(item => {
    const contact = item.name.toLowerCase();
    return contact.includes(filter.toLowerCase());
  });

  return (
    <div className={style.contactListWrapper}>
      {filteredContacts.length === 0 ? (
        <p className={style.noContactsMessage}>
          Oops... you don`t have any contacts.
        </p>
      ) : (
        <ul className={style.contactList}>
          {filteredContacts.map(contact => {
            return (
              <li key={contact.id} className={style.contactList__item}>
                <p>{contact.name}</p>
                <p>{contact.number}</p>
                <button
                  type="button"
                  onClick={() => dispatch(deleteContact(contact.id))}
                  className={style.contactList__button}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
