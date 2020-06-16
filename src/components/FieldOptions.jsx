import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import FieldList from './FieldList.jsx';
import FieldAdd from './FieldAdd.jsx';
import FieldOptionInput from './FieldOptionInput.jsx';
import FieldOptionRadio from './FieldOptionRadio.jsx';
import ButtonSmall from './ButtonSmall.jsx';
import Label from './Label.jsx';

const FieldOptions = ({
  optionsVisible,
  // field,
  typeOptions,
  hasParent,
  parentId,
  options,
  handleChange,
  childFields,
  setChildFields,
  schema,
  setSchema,
}) => {
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  return (
    <>
      {Object.keys(typeOptions).map((option, index) => (
        <>
          {(typeOptions[option].required || optionsVisible) && (
            <div
              key={option}
              className={`flex flex-col py-2 ${
                // TODO: Deep nested FieldOptions has too much x padding and now l/r borders
                parentId ? `px-4` : `px-4`
              } border-t border-gray-200`}
            >
              <Label className="mb-2">
                {option}
                {typeOptions[option].type && (
                  <span className="pl-2 opacity-50">
                    {typeOptions[option].type}
                  </span>
                )}
                {typeOptions[option].required && (
                  <span className="pl-2 text-red-500">required</span>
                )}
                <div className="ml-auto pl-2 flex-shrink-0 flex items-center h-full">
                  <ButtonSmall
                    disabled={!typeOptions[option].description}
                    color={descriptionVisible === option ? `purple` : `purple`}
                    icon={descriptionVisible === option ? `x` : `info`}
                    className="rounded-full"
                    onClick={() =>
                      setDescriptionVisible(
                        descriptionVisible === option ? false : option
                      )
                    }
                  />
                </div>
              </Label>
              {descriptionVisible === option &&
                typeOptions[option].description && (
                  <div className="mb-1 p-2 bg-purple-100 text-purple-600 rounded text-sm">
                    {typeOptions[option].description}
                  </div>
                )}
              <div className="flex items-center">
                {/* TODO: These inputs don't submit the form on enter? */}
                <div className="flex-1">
                  {/* Numbers, and strings without choices */}
                  {(typeOptions[option].type === 'number' ||
                    (typeOptions[option].type === 'string' &&
                      !typeOptions[option].choices)) && (
                    <FieldOptionInput
                      name={option}
                      type={typeOptions[option].type}
                      placeholder={typeOptions[option].default}
                      value={options[option] || ''}
                      onChange={handleChange}
                    />
                  )}

                  {/* Strings with choices */}
                  {typeOptions[option].type === 'string' &&
                    typeOptions[option].choices && (
                      <div className="flex justify-start space-x-4">
                        {typeOptions[option].default && (
                          <FieldOptionRadio
                            isDefaultRadio
                            value={typeOptions[option].default}
                            option={option}
                            onChange={handleChange}
                            checked={!options[option]}
                          />
                        )}
                        {typeOptions[option].choices.map(choice => (
                          <FieldOptionRadio
                            key={choice}
                            value={choice}
                            option={option}
                            onChange={handleChange}
                            checked={options[option] === choice}
                          />
                        ))}
                      </div>
                    )}

                  {/* Booleans */}
                  {typeOptions[option].type === 'boolean' && (
                    <div className="flex justify-start space-x-4">
                      <FieldOptionRadio
                        isDefaultRadio
                        value={typeOptions[option].default ? `true` : `false`}
                        option={option}
                        onChange={handleChange}
                        checked={typeof options[option] !== 'boolean'}
                      />
                      <FieldOptionRadio
                        value="true"
                        option={option}
                        onChange={handleChange}
                        checked={
                          typeof options[option] === 'boolean' &&
                          options[option]
                        }
                      />
                      <FieldOptionRadio
                        value="false"
                        option={option}
                        onChange={handleChange}
                        checked={
                          typeof options[option] === 'boolean' &&
                          !options[option]
                        }
                      />
                    </div>
                  )}

                  {/* Array's */}
                  {typeOptions[option].type === 'array' && (
                    <div className="flex flex-col">
                      {/* parentId means we're editing an existing field */}
                      <FieldAdd
                        schema={parentId ? schema : childFields}
                        setSchema={parentId ? setSchema : setChildFields}
                        hasParent={hasParent || false}
                        parentId={parentId}
                      />

                      {/* Children of this field */}
                      {childFields && childFields.length > 0 && (
                        <FieldList
                          schema={childFields}
                          setSchema={setChildFields}
                          hasParent
                        />
                      )}
                    </div>
                  )}

                  {(typeOptions[option].type === 'function' ||
                    typeOptions[option].type === 'object' ||
                    typeOptions[option].type === 'string:function' ||
                    typeOptions[option].type === 'array:string') && (
                    <div className="bg-gray-200 text-gray-500 rounded text-sm p-2">
                      Not yet editable. Check back soon!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ))}
    </>
  );
};
export default FieldOptions;

FieldOptions.propTypes = {
  optionsVisible: PropTypes.bool,
  // field: PropTypes.object,
  typeOptions: PropTypes.object,
  hasParent: PropTypes.bool,
  parentId: PropTypes.string,
  options: PropTypes.object,
  handleChange: PropTypes.func,
  childFields: PropTypes.array,
  setChildFields: PropTypes.func,
  schema: PropTypes.array,
  setSchema: PropTypes.func,
};
