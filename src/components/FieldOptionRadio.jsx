import React from 'react';
import PropTypes from 'prop-types';

import Label from './Label.jsx';

const FieldOptionRadio = ({
  isDefaultRadio,
  value,
  option,
  onChange,
  checked,
}) => {
  const radioId = isDefaultRadio ? `${option}-default` : `${option}-${value}`;

  return (
    <label
      className={`flex flex-col items-start pt-2 cursor-pointer ${
        isDefaultRadio ? `border-r border-gray-200 pr-3` : ``
      }`}
      htmlFor={radioId}
    >
      <input
        className="absolute opacity-0"
        type="radio"
        value={isDefaultRadio ? `` : value}
        id={radioId}
        name={option}
        onChange={onChange}
        checked={checked}
      ></input>
      <span className="radio"></span>
      <Label dark>
        {isDefaultRadio && <span className="block">default:</span>}
        {value}
      </Label>
    </label>
  );
};

export default FieldOptionRadio;

FieldOptionRadio.propTypes = {
  isDefaultRadio: PropTypes.bool,
  value: PropTypes.string,
  option: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};
