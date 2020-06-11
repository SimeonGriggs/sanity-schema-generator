import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FieldAdd from './FieldAdd.jsx';
import FieldList from './FieldList.jsx';
import ButtonSmall from './ButtonSmall.jsx';

import { findFieldById } from '../helpers/helpers.js';

const FieldItem = ({ field, index, schema, setSchema, parentId, count }) => {
  const [editorVisible, setEditorVisible] = useState(false);
  const children = field.of || field.fields || false;

  // Delete field based on name
  function deleteField(id) {
    if (!parentId) {
      // Fast delete top-level field
      setSchema(schema.filter(schemaField => schemaField.id !== id));
    } else {
      // Search and delete deep field
      let currentSchema = [...schema];
      currentSchema = findFieldById(currentSchema, id, 'delete');

      setSchema(currentSchema);
    }
  }

  // Shift field up/down the array
  function moveField(id, amount) {
    if (!schema || !id) return null;

    let updatedSchema = [...schema]; // Spreading makes a *new* array

    if (!parentId) {
      // Fast move top-level field
      const movingPosition = schema[index];
      const shiftedPosition = schema[index + amount];

      updatedSchema[index + amount] = movingPosition;
      updatedSchema[index] = shiftedPosition;
    } else if (id && amount) {
      // Search and move deep field
      updatedSchema = findFieldById(updatedSchema, id, amount);
    } else {
      console.error('No ID or Parent ID');
    }

    setSchema(updatedSchema);
  }

  return (
    <div className="group flex flex-col py-2 pl-2">
      <div className="flex justify-between items-center">
        <div className="flex-1 leading-5">
          {field.title}
          <br />
          <code className="text-xs">
            {field.name && (
              <span className="text-gray-500 pr-1">{field.name}</span>
            )}
            {field.type && <span className="text-gray-400">{field.type}</span>}
          </code>
        </div>

        <div className="pl-4 grid grid-flow-col grid-rows-2 gap-1 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
          <ButtonSmall
            color="gray"
            icon="cheveronUp"
            disabled={index === 0}
            onClick={() => moveField(field.id, -1)}
          />
          <ButtonSmall
            color="gray"
            icon="cheveronDown"
            disabled={
              count ? index === count - 1 : index === schema?.length - 1
            }
            onClick={() => moveField(field.id, 1)}
          />
          <ButtonSmall
            color={editorVisible ? `green` : `orange`}
            icon={editorVisible ? `x` : `pencil`}
            onClick={() => setEditorVisible(!editorVisible)}
          />
          <ButtonSmall
            color="red"
            icon="trash"
            onClick={() => deleteField(field.id)}
          />
        </div>
      </div>

      {/* Edit this field */}
      {editorVisible && (
        <div className="flex-1 mt-2">
          <FieldAdd
            field={field}
            buttonMode="edit"
            setEditorVisible={setEditorVisible}
            schema={schema}
            setSchema={setSchema}
            parentId={parentId}
          />
        </div>
      )}

      {/* Child fields in main list */}
      {children && children.length > 0 && !editorVisible && (
        <FieldList
          schema={schema}
          setSchema={setSchema}
          hasParent
          parentId={field.id}
        />
      )}
    </div>
  );
};

export default FieldItem;

FieldItem.propTypes = {
  field: PropTypes.object,
  index: PropTypes.number,
  schema: PropTypes.array,
  setSchema: PropTypes.func,
  parentId: PropTypes.string,
  count: PropTypes.number,
};
