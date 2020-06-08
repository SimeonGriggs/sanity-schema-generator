import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ children, className }) => (
  <span
    className={`${className} text-xs uppercase text-gray-500 font-bold mb-1 inline-block leading-2`}
  >
    {children}
  </span>
);

export default Label;

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
