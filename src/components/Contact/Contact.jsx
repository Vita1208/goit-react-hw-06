import PropTypes from 'prop-types';
import { HiUser, HiPhone } from "react-icons/hi2";
import css from './Contact.module.css';

export default function Contact({ data: { id, name, number }, onDelete }) {
    return (
        <div className={css.contact}>
            <p className={css.text}><HiUser className={css.icon} />{name}</p>
            <p><HiPhone className={css.icon} />{number}</p>
            <button className={css.button} type="button" onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
}

Contact.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};
