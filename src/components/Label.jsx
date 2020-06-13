import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ children, className, dark }) => (
  <span
    className={`${className} ${
      dark ? `` : `text-gray-600`
    } text-xs font-mono mb-1 inline-block leading-2`}
  >
    {children}
  </span>
);

export default Label;

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dark: PropTypes.bool,
};
