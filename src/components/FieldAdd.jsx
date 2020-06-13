import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FieldList from './FieldList.jsx';
import FieldOptions from './FieldOptions.jsx';
import Label from './Label.jsx';
import ButtonSmall from './ButtonSmall.jsx';

import {
  findFieldById,
  formatName,
  formatTitle,
  createId,
} from '../helpers/helpers.js';
import { schemaTypes } from '../helpers/schemaTypes.js';

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

  // TODO: Make this dynamic with schema options
  const refOptions = useRef([]);

  const [children, setChildren] = useState([]);
  const [id, setId] = useState(field ? field.id : false);
  const [name, setName] = useState(field ? field.title : ''); // That's confusing :/
  const [type, setType] = useState(
    field ? field.type : Object.keys(schemaTypes)[0].toLowerCase()
  );
  const [options, setOptions] = useState({});
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [buttonText, setButtonText] = useState(
    buttonMode === 'edit' ? 'Update' : 'Add'
  );

  // Set options for passed-in field
  useEffect(() => {
    // Field is not set
    if (!field) return;

    // This field type does not have options
    if (!schemaTypes[type].options) return;

    // Field options have already been passed in
    // OR this field has options, but they're not the options of the current type
    if (Object.keys(options).length) {
      const fieldTypeOptions = Object.keys(options).filter(
        key => schemaTypes[type].options[key]
      );

      if (!fieldTypeOptions.length) setOptions({});

      return;
    }

    // Find the option keys this field *could* have and pass them in
    const fieldOptions = {};

    Object.keys(schemaTypes[type].options).forEach(option => {
      if (field[option]) fieldOptions[option] = field[option];
    });

    if (Object.keys(fieldOptions).length) {
      setOptions(fieldOptions);
    }
  }, [field, options, type]);

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
    const { value } = event.target;
    const inputName = event.target.name;

    if (inputName === 'name') {
      setName(value);
      return;
    }

    if (inputName === 'type') {
      setType(value);
      return;
    }

    if (schemaTypes[type].options[inputName]) {
      const fieldOptions = { ...options };

      if (!value) {
        delete fieldOptions[inputName];
      } else if (schemaTypes[type].options[inputName].type === 'number') {
        fieldOptions[inputName] = parseInt(value);
      } else {
        fieldOptions[inputName] = value;
      }

      setOptions(fieldOptions);
    }
  }

  function getThisField() {
    const thisField = {
      id: id || createId(),
      title: formatTitle(name),
      name: formatName(name),
      type,
      ...options,
    };

    if (type === 'array') {
      delete thisField.name;
      thisField.of = children.length ? children : [];
    }

    if (type === 'object') thisField.fields = children.length ? children : [];

    return thisField;
  }

  function addOrEditField() {
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
  function addChild() {
    addOrEditField();
  }

  function handleSubmit(e) {
    if (e) e.preventDefault();

    parentId ? addChild() : addOrEditField();
  }

  // Handle 'enter' key on dropdown
  useEffect(() => {
    if (!refType.current) return null;

    refType.current.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleSubmit();
    });
  });

  return (
    <section
      className={`bg-white rounded-md flex flex-col ${
        !parentId ? `shadow-md mb-2` : ``
      }`}
    >
      <form onSubmit={e => handleSubmit(e)}>
        <div
          className={`flex p-2 ${
            parentId
              ? 'border border-b-0 border-gray-200 rounded-t pt-0'
              : `px-4`
          }`}
        >
          <label htmlFor="name" className="w-3/5">
            <Label>name</Label>
            <input
              name="name"
              ref={refName}
              value={name}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label htmlFor="type" className="flex-1 pl-2">
            <Label>type</Label>
            <select
              name="type"
              ref={refType}
              value={type}
              onChange={handleChange}
              className="input"
            >
              {Object.keys(schemaTypes).map(schemaType => (
                <option key={schemaType} value={schemaType}>
                  {schemaTypes[schemaType].title}
                </option>
              ))}
            </select>
          </label>

          <div className="pl-2 flex-shrink-0 flex items-center mt-auto h-12">
            <ButtonSmall
              disabled={!Object.keys(schemaTypes[type].options).length}
              color={optionsVisible ? `aqua` : `blue`}
              icon={optionsVisible ? `sortAscending` : `sortDescending`}
              onClick={() => setOptionsVisible(!optionsVisible)}
            />
          </div>
        </div>

        {optionsVisible && schemaTypes[type].options && (
          <FieldOptions
            typeOptions={schemaTypes[type].options}
            parentId={parentId}
            options={options}
            handleChange={handleChange}
          />
        )}
      </form>

      {(type === 'array' || type === 'object') && name && (
        <div
          className={`flex flex-col p-2 ${
            children.length > 0 ? `pb-0` : ``
          } bg-gray-100 border border-b-0 border-gray-200`}
        >
          <Label className="px-2">{type} fields</Label>
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
              ? `border-blue-300 bg-blue-100 text-blue-500 focus:bg-blue-700 focus:text-white focus:outline-none hover:border-blue-700 hover:bg-blue-700 hover:text-white`
              : `border-gray-300 bg-gray-200 text-gray-400 pointer-events-none`
          }`}
        >
          {buttonText}
          {` `}
          {schemaTypes[type].title} Field
        </button>
      )}
      {!parentId && (
        <button
          onClick={handleSubmit}
          type="button"
          className={`py-2 px-4 w-full  transition-colors duration-200 text-white flex items-center justify-center font-bold text-sm
          ${
            name
              ? `bg-blue-500 focus:bg-blue-700 hover:bg-blue-700`
              : `bg-gray-500 focus:bg-gray-700 hover:bg-gray-700`
          }`}
        >
          <img className="w-5 h-auto mr-2 text-white" src={plus} alt="" />
          {buttonText}
          {` `}
          {schemaTypes[type].title} Field
        </button>
      )}
    </section>
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
