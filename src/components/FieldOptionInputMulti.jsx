import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label';

const FieldOptionInputMulti = ({
  name,
  type,
  placeholder,
  value,
  onChange,
}) => {
  let stringValue;

  if (!value || typeof value === 'string') {
    // Value's just a string
    stringValue = value;
  } else if (Array.isArray(value[0])) {
    // Value's an array of strings
    stringValue = value.join(',');
  } else {
    // Value's an array of objects
    stringValue = value.map(valueObject => valueObject[0]).join(',');
  }

  return (
    <>
      <Label className="-mt-1 mb-1">enter a comma, separated, list</Label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={stringValue}
        onChange={onChange}
        className="input"
      />
    </>
  );
};
export default FieldOptionInputMulti;

FieldOptionInputMulti.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.array,
  onChange: PropTypes.func,
};
