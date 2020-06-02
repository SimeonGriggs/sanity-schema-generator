import React, { useRef } from 'react';

import pencil from '../svg/sm-pencil.svg';
import plus from '../svg/sm-plus.svg';
import x from '../svg/sm-x.svg';

const Fields = ({ schema, setSchema }) => {
  const refName = useRef('');
  const refType = useRef('');

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

  function camelToTitle(string) {
    const sanitized = sanitize(string);
    const result = sanitized.replace(/([A-Z])/g, ' $1');
    const camelled = result.charAt(0).toUpperCase() + result.slice(1);

    return camelled.trim();
  }

  function addField() {
    if (!refType.current.value || !refName.current.value) {
      return null;
    }

    if (!schema.find(field => field.name === refName.current.value)) {
      setSchema([
        ...schema,
        {
          title: camelToTitle(refName.current.value),
          name: sanitize(refName.current.value),
          type: refType.current.value,
        },
      ]);

      refName.current.value = '';
    }
  }

  function editField(name, type) {
    refName.current.value = name;
    refType.current.value = type;
  }

  function deleteField(name) {
    setSchema(schema.filter(field => field.name !== name));
  }

  return (
    <section className="bg-gray-100 p-4 rounded-l-lg">
      <div className="bg-white p-2 mb-2 rounded-md shadow border border-gray-100 shadow-sm">
        <div className="flex">
          <label htmlFor="name">
            <span className="text-xs font-bold mb-1 inline-block">
              Name (camelCase)
            </span>
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
                <option value={type.toLowerCase()}>{camelToTitle(type)}</option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          className="py-1 px-4 mt-1 w-full bg-green-400 text-white rounded flex items-center justify-center font-bold"
          onClick={addField}
        >
          <img
            className="w-5 h-auto mr-2 text-white"
            src={plus}
            alt="Add Field"
          />
          Add Field
        </button>
      </div>

      {schema.map((field, index) => (
        <div
          className="flex justify-between items-center bg-gray-200 border border-gray-300 p-2 rounded-md mb-2"
          key={index}
        >
          <div className="flex-1">
            {field.title}
            <br />
            <code className="text-xs">{field.type}</code>
          </div>

          <button
            type="button"
            className="p-2 bg-orange-400 text-white rounded"
            onClick={() => editField(field.name, field.type)}
          >
            <img className="w-5 h-auto text-white" src={pencil} alt="edit" />
          </button>

          <button
            type="button"
            className="p-2 ml-1 bg-red-400 text-white rounded"
            onClick={() => deleteField(field.name)}
          >
            <img className="w-5 h-auto text-white" src={x} alt="delete" />
          </button>
        </div>
      ))}
    </section>
  );
};

export default Fields;
