import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import pencil from '../svg/sm-pencil.svg';
import x from '../svg/sm-x.svg';
import trash from '../svg/sm-trash.svg';
import cheveronDown from '../svg/sm-cheveron-down.svg';
import cheveronUp from '../svg/sm-cheveron-up.svg';
import documentDuplicate from '../svg/sm-document-duplicate.svg';
import clipboardCopy from '../svg/sm-clipboard-copy.svg';
import sortAscending from '../svg/sm-sort-ascending.svg';
import sortDescending from '../svg/sm-sort-descending.svg';
import info from '../svg/sm-information-circle.svg';
import exclamation from '../svg/sm-exclamation.svg';

const ButtonSmall = ({ onClick, disabled, color, icon, className }) => {
  const colors = {
    red: 'bg-red-gradient bg-red-400 hover:bg-red-500 focus:bg-red-500',
    orange:
      'bg-orange-gradient bg-orange-400 hover:bg-orange-500 focus:bg-orange-500',
    green:
      'bg-green-gradient bg-green-400 hover:bg-green-500 focus:bg-green-500',
    blue: 'bg-blue-gradient bg-blue-500 hover:bg-blue-700 focus:bg-blue-700',
    aqua: 'bg-aqua-gradient bg-aqua-500 hover:bg-aqua-700 focus:bg-aqua-700',
    gray: 'bg-gray-gradient bg-gray-500 hover:bg-gray-700 focus:bg-gray-700',
    purple:
      'bg-purple-gradient bg-purple-500 hover:bg-purple-700 focus:bg-purple-700',
  };

  const icons = {
    pencil,
    x,
    trash,
    cheveronDown,
    cheveronUp,
    documentDuplicate,
    clipboardCopy,
    sortAscending,
    sortDescending,
    info,
    exclamation,
  };

  return (
    <button
      type="button"
      className={`transition-colors duration-200 flex justify-center items-center text-white rounded-sm w-5 h-5 flex-shrink-0 focus:outline-none ${
        colors[color]
      } ${disabled ? 'opacity-25 pointer-events-none' : ''}
      ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <img className="w-4 h-auto text-white" src={icons[icon]} alt="edit" />
    </button>
  );
};

export default ButtonSmall;

ButtonSmall.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
};
