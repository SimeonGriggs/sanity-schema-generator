import React, { useRef, useState, useEffect } from 'react';

import FieldAdd from './FieldAdd.jsx';
import ButtonSmall from './ButtonSmall.jsx';

const FieldItem = ({ field, index, schema, setSchema }) => {
  const [editorVisible, setEditorVisible] = useState(false);

  // Delete field based on name
  function deleteField(name) {
    setSchema(schema.filter(field => field.name !== name));
  }

  // Shift field up/down the array
  function moveField(amount = 1) {
    if (!schema) return null;

    const updatedSchema = [...schema]; // Spreading makes a *new* array
    const movingPosition = schema[index];
    const shiftedPosition = schema[index + amount];

    updatedSchema[index + amount] = movingPosition;
    updatedSchema[index] = shiftedPosition;

    setSchema(updatedSchema);
  }

  return (
    <div className="flex flex-col bg-gray-200 border border-gray-300 p-2 mt-2 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {field.title}
          <br />
          <code className="text-xs">
            {field.name}
            {` `}
            <span className="opacity-50">{field.type}</span>
          </code>
        </div>

        <div className="grid grid-flow-col grid-rows-2 gap-1">
          <ButtonSmall
            color="gray"
            icon="cheveronUp"
            disabled={index === 0}
            onClick={() => moveField(-1)}
          />
          <ButtonSmall
            color="gray"
            icon="cheveronDown"
            disabled={index === schema.length - 1}
            onClick={() => moveField(1)}
          />
          <ButtonSmall
            color="orange"
            icon="pencil"
            onClick={() => setEditorVisible(!editorVisible)}
          />
          <ButtonSmall
            color="red"
            icon="x"
            onClick={() => deleteField(field.name)}
          />
        </div>
      </div>
      {editorVisible && (
        <div className="flex-1 mt-2">
          <FieldAdd
            field={field}
            buttonMode="edit"
            setEditorVisible={setEditorVisible}
            schema={schema}
            setSchema={setSchema}
          />
        </div>
      )}
    </div>
  );
};

export default FieldItem;
