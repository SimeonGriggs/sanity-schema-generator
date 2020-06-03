import React, { useRef, useState } from 'react';

import pencil from '../svg/sm-pencil.svg';
import plus from '../svg/sm-plus.svg';
import x from '../svg/sm-x.svg';

const Fields = ({ schema, setSchema }) => {
  const refName = useRef('');
  const refType = useRef('');

  const [buttonText, setButtonText] = useState('Add Field');

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

  function sanitize(string) {
    return string.replace(/[^a-zA-Z ]/g, '');
  }

  function titleCaseWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // Outputs 'camelCase'
  function formatName(string) {
    const sanitized = sanitize(string);
    const result = sanitized.replace(/([A-Z])/g, ' $1');

    const pascalled = result
      .split(' ')
      .map(word => titleCaseWord(word))
      .join('');

    const camelled = pascalled.charAt(0).toLowerCase() + pascalled.slice(1);

    return camelled.trim();
  }

  // Outputs 'Title Case'
  function formatTitle(string) {
    const sanitized = sanitize(string);

    // Uppercase words
    return sanitized
      .split(' ')
      .map(word => titleCaseWord(word))
      .join(' ');
  }

  function addField(e) {
    e.preventDefault();

    if (!refType.current.value || !refName.current.value) {
      return null;
    }

    const currentFields = schema;
    const thisField = {
      title: formatTitle(refName.current.value),
      name: formatName(refName.current.value),
      type: refType.current.value,
    };

    const fieldIndex = schema.findIndex(
      field => field.name === refName.current.value
    );

    // Update or add field
    fieldIndex >= 0
      ? (currentFields[fieldIndex] = thisField)
      : currentFields.push(thisField);

    setSchema([...currentFields]);

    refName.current.value = '';
    setButtonText('Add Field');
  }

  function editField(name, type) {
    setButtonText('Edit Field');
    refName.current.value = name;
    refType.current.value = type;
  }

  function deleteField(name) {
    setSchema(schema.filter(field => field.name !== name));
  }

  return (
    <section className="bg-gray-100 p-4 rounded-l-lg">
      <form
        onSubmit={addField}
        className="bg-white p-2 mb-2 rounded-md shadow border border-gray-100 shadow-sm"
      >
        <div className="flex">
          <label htmlFor="name">
            <span className="text-xs font-bold mb-1 inline-block">Name</span>
            <br />
            <input
              name="name"
              className="outline-none focus:border-green-400 bg-white p-2 border rounded border-gray-500"
              ref={refName}
            />
          </label>
          <label htmlFor="type">
            <span className="text-xs font-bold mb-1 inline-block">Type</span>
            <br />
            <select
              className="outline-none focus:border-green-400 bg-white p-2 ml-1 border rounded border-gray-500"
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
          className="py-1 px-4 mt-1 w-full bg-green-400 focus:bg-green-600 hover:bg-green-600 transition-colors duration-200 text-white rounded flex items-center justify-center font-bold"
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

      {schema.map((field, index) => (
        <div
          className="flex justify-between items-center bg-gray-200 border border-gray-300 p-2 rounded-md mb-2"
          key={index}
        >
          <div className="flex-1">
            {field.title}
            <br />
            <code className="text-xs">
              {field.name}
              {` `}
              <span className="opacity-50">{field.type}</span>
            </code>
          </div>

          <button
            type="button"
            className="p-1 bg-orange-400 text-white rounded"
            onClick={() => editField(field.name, field.type)}
          >
            <img className="w-4 h-auto text-white" src={pencil} alt="edit" />
          </button>

          <button
            type="button"
            className="p-1 ml-1 bg-red-400 text-white rounded"
            onClick={() => deleteField(field.name)}
          >
            <img className="w-4 h-auto text-white" src={x} alt="delete" />
          </button>
        </div>
      ))}
    </section>
  );
};

export default Fields;
