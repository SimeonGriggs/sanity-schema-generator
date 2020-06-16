import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ children, className, dark }) => {
  const classList = `${className || ''} ${
    dark ? `` : `text-gray-600`
  } text-xs font-mono flex items-center justify-start leading-2`;

  return <span className={classList.trim()}>{children}</span>;
};

export default Label;

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dark: PropTypes.bool,
};
