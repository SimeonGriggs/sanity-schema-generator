import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FieldList from './FieldList.jsx';
import Label from './Label.jsx';
import ButtonSmall from './ButtonSmall.jsx';

import {
  findFieldById,
  formatName,
  formatTitle,
  schemaTypes,
  titleCaseWord,
  createId,
} from '../helpers/helpers.js';

import plus from '../svg/sm-plus.svg';

const FieldAdd = ({
  field,
  buttonMode,
  setEditorVisible,
  schema,
  setSchema,
  parentId,
}) => {
  // Refs used to re-set values or handle keypresses
  const refName = useRef();
  const refType = useRef();
  const refRows = useRef();

  const [children, setChildren] = useState([]);
  const [id, setId] = useState(field ? field.id : false);
  const [name, setName] = useState(field ? field.title : ''); // That's confusing :/
  const [type, setType] = useState(
    field ? field.type : schemaTypes[0].toLowerCase()
  );
  const [options, setOptions] = useState({});
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [buttonText, setButtonText] = useState(
    buttonMode === 'edit' ? 'Update' : 'Add'
  );

  // Set options for passed-in field
  useEffect(() => {
    if (!options.rows && field && field.type === 'text') {
      setOptions({
        ...options,
        rows: field.rows,
      });
    }
  }, [field, options]);

  // Set children for passed-in field
  useEffect(() => {
    if (
      field &&
      (field.type === 'array' || field.type === 'object') &&
      children.length === 0
    ) {
      setChildren(field.type === 'array' ? field.of : field.fields);
    }
  }, [field, children.length]);

  function handleChange(event) {
    if (event.target.name === 'name') setName(event.target.value);
    if (event.target.name === 'type') setType(event.target.value);
    if (event.target.name === 'rows') {
      setOptions({ ...options, rows: parseInt(event.target.value) });
    }
  }

  function getThisField() {
    const thisField = {
      id: id || createId(),
      title: formatTitle(name),
      name: formatName(name),
      type,
    };

    if (type === 'text' && options.rows) {
      thisField.rows = options.rows;
    }

    if (type === 'array') {
      delete thisField.name;
      thisField.of = children.length ? children : [];
    }
    if (type === 'object') thisField.fields = children.length ? children : [];

    return thisField;
  }

  function addOrEditField(fieldId = false) {
    if (!name || !type || !schema) return null;

    let currentSchema = [...schema]; // New array
    const thisField = getThisField();

    // Adding new fields on the end of an array
    if (!parentId) {
      if (field) {
        // Editing an existing field
        const fieldIndex = currentSchema.findIndex(
          findField => findField.id === field.id
        );

        if (fieldIndex >= 0) {
          currentSchema[fieldIndex] = thisField;
        } else {
          // This should not be possible?
          currentSchema.push(thisField);
        }
      } else {
        // Writing a new field
        currentSchema.push(thisField);
      }
    } else if (id) {
      // This will find and override any field with the same id
      // TODO: This no longer checks for unique `name`s
      currentSchema = findFieldById(currentSchema, id, thisField);
    } else {
      // Tack this new field on the end
      currentSchema.push(thisField);
    }

    // Write it!
    setSchema(currentSchema);

    // Reset state
    setName('');
    if (!parentId) setChildren([]);

    // Re-focus input if not editing an existing field
    if (!field) refName.current.focus();

    // Hide field editor if used
    if (setEditorVisible) setEditorVisible(false);
    if (optionsVisible) setOptionsVisible(false);
    setOptions({});
  }

  // Just incase this needs to be a different function later?
  function addChild(fieldId) {
    addOrEditField(fieldId);
  }

  function handleSubmit(e) {
    if (e) e.preventDefault();

    parentId ? addChild(id) : addOrEditField(id);
  }

  // Handle 'enter' key on dropdown
  useEffect(() => {
    if (!refType.current) return null;

    refType.current.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleSubmit();
    });
  });

  return (
    <form
      onSubmit={e => handleSubmit(e)}
      className={`bg-white rounded-md flex flex-col ${
        !parentId ? `shadow-md mb-2` : ``
      }`}
    >
      <div
        className={`flex p-2 ${
          parentId ? 'border border-b-0 border-gray-200 rounded-t pt-0' : `px-4`
        }`}
      >
        <label htmlFor="name" className="w-3/5">
          <Label>Name</Label>
          <input
            name="name"
            ref={refName}
            value={name}
            onChange={handleChange}
            className="outline-none focus:border-green-400 focus:bg-green-100 bg-white p-2 border rounded border-gray-500 w-full"
          />
        </label>
        <label htmlFor="type" className="flex-1 pl-2">
          <Label>Type</Label>
          <select
            name="type"
            ref={refType}
            value={type}
            onChange={handleChange}
            className="outline-none focus:border-green-400 focus:bg-green-100 bg-white p-2 border rounded border-gray-500 w-full"
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

        <div className="pl-2 flex-shrink-0 flex items-center mt-auto h-12">
          <ButtonSmall
            disabled={type !== 'text'}
            color={optionsVisible ? `green` : `gray`}
            icon={optionsVisible ? `sortAscending` : `sortDescending`}
            onClick={() => setOptionsVisible(!optionsVisible)}
          />
        </div>
      </div>

      {optionsVisible && (
        <>
          {type === 'text' && (
            <div className="flex flex-col px-4 pb-2">
              <Label>Rows</Label>
              <input
                name="rows"
                type="number"
                ref={refRows}
                value={options.rows || undefined}
                onChange={handleChange}
                className="outline-none focus:border-green-400 focus:bg-green-100 bg-white p-2 border rounded border-gray-500 w-full"
              />
            </div>
          )}
        </>
      )}

      {(type === 'array' || type === 'object') && name && (
        <div
          className={`flex flex-col p-2 ${
            children.length > 0 ? `pb-0` : ``
          } bg-gray-100 border border-b-0 border-gray-200`}
        >
          <Label className="px-2">{titleCaseWord(type)} Fields</Label>
          <FieldAdd
            schema={children}
            setSchema={setChildren}
            parentId={field ? field.id : 'not yet set'}
          />
          {children.length > 0 && (
            <FieldList schema={children} setSchema={setChildren} hasParent />
          )}
        </div>
      )}

      {parentId && (
        <button
          onClick={handleSubmit}
          type="button"
          className={`py-2 px-4 w-full rounded-b border transition-colors duration-200 flex items-center justify-center font-bold text-sm ${
            name
              ? `border-green-300 bg-green-200 text-green-600 focus:bg-green-600 hover:border-green-600 hover:bg-green-600 hover:text-white`
              : `border-gray-300 bg-gray-200 text-gray-400 pointer-events-none`
          }`}
        >
          {buttonText}
          {` `}
          {titleCaseWord(type)} Field
        </button>
      )}

      {!parentId && (
        <button
          type="submit"
          className="py-2 px-4 w-full bg-green-400 focus:bg-green-600 hover:bg-green-600 transition-colors duration-200 text-white flex items-center justify-center font-bold text-sm"
        >
          <img className="w-5 h-auto mr-2 text-white" src={plus} alt="" />
          {buttonText}
          {` `}
          {titleCaseWord(type)} Field
        </button>
      )}
    </form>
  );
};

export default FieldAdd;

FieldAdd.propTypes = {
  buttonMode: PropTypes.string,
  field: PropTypes.object,
  setEditorVisible: PropTypes.func,
  schema: PropTypes.array,
  setSchema: PropTypes.func,
  parentId: PropTypes.string,
};
