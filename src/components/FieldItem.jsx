import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FieldAdd from './FieldAdd.jsx';
import FieldList from './FieldList.jsx';
import ButtonSmall from './ButtonSmall.jsx';

const FieldItem = ({ field, index, schema, setSchema, parentId, count }) => {
  const [editorVisible, setEditorVisible] = useState(false);
  const children = field.of || field.fields || false;

  // Delete field based on name
  function deleteField(id) {
    if (!parentId) {
      // Fast delete top-level field
      setSchema(schema.filter(schemaField => schemaField.id !== id));
    } else {
      let currentSchema = [...schema];

      // TODO: Replace this with a walker which will look down the tree
      // Currently this won't remove from deep nested arrays/objects
      const idIndex = currentSchema.findIndex(
        currentField => currentField.id === parentId
      );

      if (idIndex >= 0) {
        // In the field list we're modifying the entire list of fields in the schema
        if (currentSchema[idIndex].type === 'array') {
          currentSchema[idIndex].of = currentSchema[idIndex].of.filter(
            child => child.id !== id
          );
        } else if (currentSchema[idIndex].type === 'object') {
          currentSchema[idIndex].fields = currentSchema[idIndex].fields.filter(
            child => child.id !== id
          );
        }

        // But in FieldAdd we're only modifying the local array of children
        else if (currentSchema[idIndex]) {
          currentSchema = currentSchema.filter(child => child.id !== id);
        }
      }

      // Set schema
      setSchema(currentSchema);
    }
  }

  // Shift field up/down the array
  function moveField(amount = 1) {
    if (!schema) return null;

    const updatedSchema = [...schema]; // Spreading makes a *new* array

    if (!parentId) {
      const movingPosition = schema[index];
      const shiftedPosition = schema[index + amount];

      updatedSchema[index + amount] = movingPosition;
      updatedSchema[index] = shiftedPosition;
    } else {
      const idIndex = updatedSchema.findIndex(
        currentField => currentField.id === parentId
      );

      // In the field list we're modifying the entire list of fields in the schema
      if (updatedSchema[idIndex].type === 'array') {
        const movingPosition = updatedSchema[idIndex].of[index];
        const shiftedPosition = updatedSchema[idIndex].of[index + amount];
        updatedSchema[idIndex].of[index + amount] = movingPosition;
        updatedSchema[idIndex].of[index] = shiftedPosition;
      } else if (updatedSchema[idIndex].type === 'object') {
        const movingPosition = updatedSchema[idIndex].fields[index];
        const shiftedPosition = updatedSchema[idIndex].fields[index + amount];
        updatedSchema[idIndex].fields[index + amount] = movingPosition;
        updatedSchema[idIndex].fields[index] = shiftedPosition;
      }

      // But in FieldAdd we're only modifying the local array of children
      else if (updatedSchema[idIndex]) {
        const movingPosition = updatedSchema[index];
        const shiftedPosition = updatedSchema[index + amount];
        updatedSchema[index + amount] = movingPosition;
        updatedSchema[index] = shiftedPosition;
      }
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
            onClick={() => moveField(-1)}
          />
          <ButtonSmall
            color="gray"
            icon="cheveronDown"
            disabled={
              count ? index === count - 1 : index === schema?.length - 1
            }
            onClick={() => moveField(1)}
          />
          <ButtonSmall
            color={editorVisible ? `green` : `orange`}
            icon={editorVisible ? `x` : `pencil`}
            onClick={() => setEditorVisible(!editorVisible)}
          />
          <ButtonSmall
            color="red"
            icon="x"
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
