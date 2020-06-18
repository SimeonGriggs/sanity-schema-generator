import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
import FieldList from './FieldList.jsx';

const FieldAdd = ({
  field,
  buttonMode,
  setEditorVisible,
  schema,
  setSchema,
  hasParent,
  parentId,
}) => {
  /**
   * TODO: In FieldOptions we pass-in both `parentId` and `field` object
   * parentId === field.id
   * So. Should we? Seems wasteful. Works, though.
   */

  // Refs used to re-set values or handle keypresses
  const refName = useRef();
  const refType = useRef();

  const [childFields, setChildFields] = useState([]);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);

  const [id, setId] = useState(field && !parentId ? field.id : '');
  const [name, setName] = useState(field && !parentId ? field.title : ''); // That's confusing :/
  const [type, setType] = useState(
    field && !parentId ? field.type : Object.keys(schemaTypes)[0].toLowerCase()
  );
  const [options, setOptions] = useState({});
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [buttonText, setButtonText] = useState(
    buttonMode === 'edit' ? 'Update' : 'Add'
  );

  // Set childFields for passed-in parentId
  useEffect(() => {
    if (childFields.length === 0 && parentId) {
      const parentField = findFieldById(schema, parentId);

      if (
        // There is a field
        parentField &&
        // This type has 'fields' or 'of' keys
        (parentField.fields || parentField.of)
      ) {
        if (parentField.fields) {
          setChildFields(parentField.fields);
        } else if (parentField.of) {
          setChildFields(parentField.of);
        }
      }
    }
  }, [childFields, childFields.length, parentId, schema]);

  // Set options for passed-in field
  useEffect(() => {
    console.log(childFields);

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

    console.log(childFields, type);

    // Add childFields from state, not form values
    if (childFields && childFields.length) {
      if (schemaTypes[type].options.fields) {
        fieldOptions.fields = childFields;
      } else if (schemaTypes[type].options.of) {
        fieldOptions.of = childFields;
      }
    }

    Object.keys(schemaTypes[type].options).forEach(option => {
      if (typeof field[option] === 'boolean' && !field[option]) {
        // Pass along 'false' bool values
        fieldOptions[option] = field[option];
      } else if (field[option]) {
        // Otherwise only pass in true or defined values
        fieldOptions[option] = field[option];
      }
    });

    if (Object.keys(fieldOptions).length) {
      setOptions(fieldOptions);
    }
  }, [childFields, field, options, type]);

  /**
   * onChange event handler, does not update state
   */
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
        if (options.inputName) {
          delete fieldOptions[inputName];
        } else {
          // TODO: Clean-out empty object keys
          fieldOptions[inputName] = '';
        }
      } else if (schemaTypes[type].options[inputName].type === 'number') {
        fieldOptions[inputName] = parseInt(value);
      } else if (schemaTypes[type].options[inputName].type === 'boolean') {
        switch (value) {
          case 'false':
            fieldOptions[inputName] = false;
            break;
          case 'true':
            fieldOptions[inputName] = true;
            break;
          default:
            fieldOptions[inputName] = '';
            // delete fieldOptions[inputName];
            break;
        }
      } else {
        fieldOptions[inputName] = value;
      }

      setOptions(fieldOptions);
    }
  }

  function getThisField() {
    let newId;

    if (!id) {
      newId = createId();
      setId(newId);
    }

    const thisField = {
      id: id || newId,
      title: formatTitle(name),
      name: formatName(name),
      type,
      ...options,
    };

    // Get child fields from state and move into the field
    if (childFields.length > 0) {
      if (schemaTypes[type].options.fields) {
        thisField.fields = childFields;
      } else if (schemaTypes[type].options.of) {
        thisField.of = childFields;
      }
    }

    return thisField;
  }

  /**
   * FieldAdd Form is submitted, commits fields to state
   */
  function addOrEditField() {
    if (!name || !type || !schema) return null;

    let currentSchema = schema.length ? [...schema] : []; // New array
    const thisField = getThisField();

    // TODO: The below will add child fields to local state but does not save it to the parent field when added to schema
    // New inner field, on new top level field
    // Short circuit all other conditions
    // `parentId` === 'not yet defined'
    if (!field && parentId) {
      const currentChildFields = [...childFields];
      currentChildFields.push(thisField);
      setChildFields(currentChildFields);
      // setName('');
      // setId('');
      // return;
    }

    // Adding new fields on the end of an array
    if (!parentId) {
      if (field) {
        // TODO: This might be redundant, could just use `findFieldById()` for top level fields?
        const fieldIndex = currentSchema.findIndex(
          findField => findField.id === field.id
        );

        if (fieldIndex >= 0) {
          // Updating existing top-level field
          currentSchema[fieldIndex] = thisField;
        } else {
          // Updating existing inner field
          currentSchema = findFieldById(currentSchema, id, thisField);
        }
      } else {
        // Writing a new field
        currentSchema.push(thisField);
      }
    } else {
      // Writing new inner field to an existing field
      const newParentField = findFieldById(currentSchema, parentId);
      const parentType = newParentField ? newParentField.type : type;

      // This field type (or its parent) stores child fields on `fields`
      if (schemaTypes[parentType].options.fields) {
        if (newParentField.fields) {
          newParentField.fields.push(thisField);
        } else {
          newParentField.fields = [thisField];
        }
        // Update the entire schema just to add this child field :/
        currentSchema = findFieldById(currentSchema, parentId, newParentField);
      }

      // This field type (or its parent) stores child fields on `options`
      if (schemaTypes[parentType].options.of) {
        if (newParentField.of) {
          newParentField.of.push(thisField);
        } else {
          newParentField.of = [thisField];
        }

        // Update the entire schema just to add this child field :/
        currentSchema = findFieldById(currentSchema, parentId, newParentField);
      }
    }

    // Write it!
    setSchema(currentSchema);

    // Reset state
    setName('');
    setId('');
    if (!parentId) setChildFields([]);

    // Re-focus input if not editing an existing field
    if (!field) refName.current.focus();

    // Hide field editor if used
    if (setEditorVisible) setEditorVisible(false);
    if (optionsVisible) setOptionsVisible(false);
    setOptions({});
  }

  function handleSubmit(e) {
    if (e) e.preventDefault();

    addOrEditField();
  }

  // Handle 'enter' key on dropdown
  useEffect(() => {
    if (!refType.current) return null;

    refType.current.addEventListener('keydown', e => {
      if (e.key === 'Enter' && name) addOrEditField();
    });
  });

  return (
    <section
      className={`rounded-md flex flex-col 
    ${!parentId ? `mb-2` : ``}
    ${hasParent ? `border border-gray-300` : ``}
    `}
    >
      <form className="bg-white rounded-md" onSubmit={e => handleSubmit(e)}>
        <div
          className={`flex items-start justify-start p-2 ${
            parentId
              ? 'border border-b-0 border-gray-200 rounded-t pt-0'
              : `px-4 pt-4`
          }`}
        >
          <label htmlFor="name" className="w-3/5">
            <Label className="mb-1">name</Label>
            <input
              name="name"
              ref={refName}
              value={name}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label htmlFor="type" className="flex-1 pl-2">
            <Label className="mb-1">type</Label>
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

          <div className="flex items-center pl-2 mt-auto mb-1">
            <div className="flex-shrink-0 flex flex-col items-center space-y-1">
              <ButtonSmall
                disabled={!schemaTypes[type].description}
                color={descriptionVisible ? `green` : `purple`}
                icon={descriptionVisible ? `x` : `info`}
                onClick={() => setDescriptionVisible(!descriptionVisible)}
              />
              <ButtonSmall
                disabled={!schemaTypes[type].description}
                color={validationVisible ? `green` : `red`}
                icon={validationVisible ? `x` : `exclamation`}
                onClick={() => setValidationVisible(!validationVisible)}
              />
            </div>

            <div className="pl-1 flex-shrink-0 flex flex-col items-center space-y-1">
              <ButtonSmall
                disabled={
                  !name || !Object.keys(schemaTypes[type].options).length
                }
                color={optionsVisible ? `aqua` : `blue`}
                icon={optionsVisible ? `x` : `sortDescending`}
                onClick={() => setOptionsVisible(!optionsVisible)}
              />
            </div>
          </div>
        </div>

        {descriptionVisible && schemaTypes[type].description && (
          <div className="mb-2 mx-4 p-2 bg-purple-100 text-purple-600 rounded text-sm">
            {schemaTypes[type].description}
            {schemaTypes[type].docs && (
              <a
                className="inline-block mt-2 hover:text-purple-800"
                href={schemaTypes[type].docs}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more about <code className="font-bold">{type}</code> in the
                docs.
              </a>
            )}
          </div>
        )}

        {validationVisible && schemaTypes[type].validation && (
          <div className="mb-2 mx-4 p-2 bg-red-100 text-red-600 rounded text-sm">
            <p className="mb-2">
              This tool doesn't currently setup vaidation rules, but{' '}
              <code className="font-bold">{type}</code> has the following:
            </p>
            {Object.keys(schemaTypes[type].validation).map(rule => (
              <p className="mb-2">&bull; {rule}</p>
            ))}
          </div>
        )}

        {schemaTypes[type].options && name && (
          <FieldOptions
            optionsVisible={optionsVisible}
            typeOptions={schemaTypes[type].options}
            hasParent
            parentId={id}
            options={options}
            handleChange={handleChange}
            schema={schema}
            setSchema={setSchema}
            childFields={childFields}
            setChildFields={setChildFields}
          />
        )}
      </form>

      {hasParent && (
        <button
          onClick={handleSubmit}
          type="button"
          className={`py-2 px-4 w-full rounded-b border transition-colors duration-200 flex items-center justify-center font-bold text-sm ${
            name
              ? `border-blue-300 bg-blue-100 text-blue-500 focus:bg-blue-700 focus:border-blue-700 focus:text-white focus:outline-none hover:border-blue-700 hover:bg-blue-700 hover:text-white`
              : `border-gray-200 bg-gray-200 text-gray-400 pointer-events-none`
          }`}
        >
          {buttonText}
          {` `}
          {schemaTypes[type].title} Field
        </button>
      )}

      {parentId && childFields && childFields.length > 0 && (
        <div className="pt-2 bg-white rounded-b">
          <FieldList
            schema={childFields}
            setSchema={setChildFields}
            // parentId={id}
          />
        </div>
      )}

      {!hasParent && (
        <button
          onClick={handleSubmit}
          disabled={!name}
          type="button"
          className={`py-2 px-4 w-full transition-colors duration-200 text-white flex items-center justify-center font-bold text-sm
          ${field ? 'rounded-b' : ''}
          ${
            name
              ? `bg-blue-500 focus:outline-none focus:bg-blue-700 hover:bg-blue-700 shadow-lg`
              : `bg-gray-400`
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
  hasParent: PropTypes.bool,
  parentId: PropTypes.string,
};
