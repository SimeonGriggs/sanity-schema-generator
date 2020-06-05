import React, { useRef } from 'react';

import pencil from '../svg/sm-pencil.svg';
import x from '../svg/sm-x.svg';
import cheveronDown from '../svg/sm-cheveron-down.svg';
import cheveronUp from '../svg/sm-cheveron-up.svg';
import documentDuplicate from '../svg/sm-document-duplicate.svg';

const ButtonSmall = ({ onClick, disabled, color, icon }) => {
  const colors = {
    red: 'bg-red-400 hover:bg-red-500',
    orange: 'bg-orange-400 hover:bg-orange-500',
    green: 'bg-green-400 hover:bg-green-500',
    blue: 'bg-blue-400 hover:bg-blue-500',
    gray: 'bg-gray-500 hover:bg-gray-600',
  };

  const icons = {
    pencil,
    x,
    cheveronDown,
    cheveronUp,
    documentDuplicate,
  };

  return (
    <button
      type="button"
      className={`transition-colors duration-200 p-1 text-white rounded w-6 h-6 ${
        colors[color]
      } ${disabled ? 'opacity-25 pointer-events-none' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      <img className="w-4 h-auto text-white" src={icons[icon]} alt="edit" />
    </button>
  );
};

export default ButtonSmall;
