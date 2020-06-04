import React, { useRef, useState, useEffect } from 'react';

import {
  sanitize,
  titleCaseWord,
  formatName,
  formatTitle,
} from '../helpers/helpers.js';

import plus from '../svg/sm-plus.svg';

const FieldAdd = ({
  field,
  buttonMode,
  setEditorVisible,
  schema,
  setSchema,
}) => {
  const refName = useRef(null);
  const refType = useRef(null);

  useEffect(() => {
    if (refName.current && field) refName.current.value = field.name;
    if (refType.current && field) refType.current.value = field.type;
  });

  const [buttonText, setButtonText] = useState(
    buttonMode === 'edit' ? 'Edit Field' : 'Add Field'
  );

  const schemaTypes = [
    'Boolean',
    'Date',
    'Datetime',
    'Number',
    'Slug',
    'String',
    'Text',
    'URL',
  ];

  function addField(e) {
    if (e) e.preventDefault();

    if (!refType.current.value || !refName.current.value) {
      return null;
    }

    const currentFieldAdd = schema;
    const thisField = {
      title: formatTitle(refName.current.value),
      name: formatName(refName.current.value),
      type: refType.current.value,
    };

    // This will find and override any field with the same name
    const fieldIndex = schema.findIndex(
      field => field.name.toLowerCase() === refName.current.value.toLowerCase()
    );

    // Update or add field
    fieldIndex >= 0
      ? (currentFieldAdd[fieldIndex] = thisField)
      : currentFieldAdd.push(thisField);

    setSchema([...currentFieldAdd]);

    refName.current.value = '';

    if (!field) {
      refName.current.focus();
    }

    if (setEditorVisible) {
      setEditorVisible(false);
    }

    setButtonText('Add Field');
  }

  // Handle 'enter' key on dropdown
  useEffect(() => {
    if (!refType.current) return null;

    refType.current.addEventListener('keydown', e => {
      if (e.key === 'Enter') addField();
    });
  });

  return (
    <form
      onSubmit={e => addField(e)}
      className="bg-white rounded-md shadow shadow-sm flex flex-col"
    >
      <div className="flex p-3">
        <label htmlFor="name" className="w-3/5">
          <span className="text-xs uppercase text-gray-500 font-bold mb-1 inline-block">
            Name
          </span>
          <br />
          <input
            name="name"
            className="outline-none focus:border-green-400 focus:bg-green-100 bg-white p-2 border rounded border-gray-500 w-full"
            ref={refName}
          />
        </label>
        <label htmlFor="type" className="w-2/5">
          <span className="text-xs uppercase text-gray-500 font-bold mb-1 inline-block">
            Type
          </span>
          <br />
          <select
            className="outline-none focus:border-green-400 focus:bg-green-100 bg-white p-2 ml-1 border rounded border-gray-500 w-full"
            name="type"
            ref={refType}
          >
            {schemaTypes.map(type => (
              <option key={type.toLowerCase()} value={type.toLowerCase()}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        className="py-2 px-4 mt-1 w-full bg-green-400 focus:bg-green-600 hover:bg-green-600 transition-colors duration-200 text-white rounded-b flex items-center justify-center font-bold"
        onClick={addField}
      >
        <img
          className="w-5 h-auto mr-2 text-white"
          src={plus}
          alt="Add Field"
        />
        {buttonText}
      </button>
    </form>
  );
};

export default FieldAdd;
