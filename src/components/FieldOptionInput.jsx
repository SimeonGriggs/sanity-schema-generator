import React from 'react';
import PropTypes from 'prop-types';

const FieldOptionInput = ({ name, type, placeholder, value, onChange }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="input"
  />
);
export default FieldOptionInput;

FieldOptionInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};
