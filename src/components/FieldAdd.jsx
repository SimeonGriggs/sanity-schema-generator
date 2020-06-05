import React, { useRef, useState, useEffect } from 'react';

import { formatName, formatTitle, schemaTypes } from '../helpers/helpers.js';

import plus from '../svg/sm-plus.svg';

const FieldAdd = ({
  field,
  buttonMode,
  setEditorVisible,
  schema,
  setSchema,
}) => {
  const refName = useRef();
  const refType = useRef();
  const [name, setName] = useState(field ? field.name : '');
  const [type, setType] = useState(
    field ? field.type : schemaTypes[0].toLowerCase()
  );
  const [buttonText, setButtonText] = useState(
    buttonMode === 'edit' ? 'Edit Field' : 'Add Field'
  );

  function handleChange(event) {
    if (event.target.name === 'name') setName(event.target.value);
    if (event.target.name === 'type') setType(event.target.value);
  }

  function addField(e) {
    if (e) e.preventDefault();

    if (!name || !type) {
      return null;
    }

    const currentFieldAdd = [...schema]; // New array
    const thisField = {
      title: formatTitle(name),
      name: formatName(name),
      type,
    };

    // TODO: More on this
    if (name === 'array') {
      thisField.of = [];
    }

    // TODO: More on this
    if (name === 'object') {
      thisField.fields = [];
    }

    // This will find and override any field with the same name
    const fieldIndex = schema.findIndex(
      findField => findField.name.toLowerCase() === name.toLowerCase()
    );

    // Update or add field
    fieldIndex >= 0
      ? (currentFieldAdd[fieldIndex] = thisField)
      : currentFieldAdd.push(thisField);

    setSchema(currentFieldAdd);

    // Re-set state
    setName('');

    // Re-focus input if FieldAdd was used
    if (!field) refName.current.focus();

    // Hide field editor if used
    if (setEditorVisible) setEditorVisible(false);

    // Restore button text
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
            ref={refName}
            value={name}
            onChange={handleChange}
            className="outline-none focus:border-green-400 focus:bg-green-100 bg-white p-2 border rounded border-gray-500 w-full"
          />
        </label>
        <label htmlFor="type" className="w-2/5">
          <span className="text-xs uppercase text-gray-500 font-bold mb-1 inline-block">
            Type
          </span>
          <br />
          <select
            name="type"
            ref={refType}
            value={type}
            onChange={handleChange}
            className="outline-none focus:border-green-400 focus:bg-green-100 bg-white p-2 ml-1 border rounded border-gray-500 w-full"
          >
            {schemaTypes.map(schemaType => (
              <option
                key={schemaType.toLowerCase()}
                value={schemaType.toLowerCase()}
              >
                {schemaType}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="py-2 px-4 mt-1 w-full bg-green-400 focus:bg-green-600 hover:bg-green-600 transition-colors duration-200 text-white rounded-b flex items-center justify-center font-bold"
      >
        <img className="w-5 h-auto mr-2 text-white" src={plus} alt="" />
        {buttonText}
      </button>
    </form>
  );
};

export default FieldAdd;
