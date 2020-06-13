import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ButtonSmall from './ButtonSmall.jsx';
import Label from './Label.jsx';

const FieldOptions = ({ typeOptions, parentId, options, handleChange }) => {
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  return (
    <div>
      {Object.keys(typeOptions).map((option, index) => (
        <div
          key={option}
          className={`flex flex-col pb-2
          ${parentId ? `px-2` : `px-4`}
          pt-1 border-t border-gray-200
           `}
        >
          <Label>
            {option}
            {typeOptions[option].required && (
              <span className="text-red-500">&bull;</span>
            )}
            {typeOptions[option].type && (
              <span className="pl-2 opacity-50">
                {typeOptions[option].type}
              </span>
            )}
          </Label>
          <div className="flex">
            {/* TODO: These inputs don't submit the form enter? */}
            <div className="flex-1">
              {/* Numbers, and strings without choices */}
              {(typeOptions[option].type === 'number' ||
                (typeOptions[option].type === 'string' &&
                  !typeOptions[option].choices)) && (
                <input
                  name={option}
                  type={typeOptions[option].type}
                  placeholder={typeOptions[option].default}
                  //   ref={refOptions[index]}
                  value={options[option] || ''}
                  onChange={handleChange}
                  className="input"
                />
              )}

              {/* Strings with choices */}
              {typeOptions[option].type === 'string' &&
                typeOptions[option].choices && (
                  <div className="flex justify-start space-x-4">
                    {typeOptions[option].default && (
                      <label
                        className="flex flex-col items-start pt-2 border-r border-gray-200 pr-3"
                        htmlFor={`default-${option}`}
                      >
                        <input
                          className="mb-1"
                          type="radio"
                          value=""
                          id={`default-${option}`}
                          name={option}
                          onChange={handleChange}
                          checked={!options[option]}
                        ></input>
                        <Label dark>
                          default:
                          <br /> {typeOptions[option].default}
                        </Label>
                      </label>
                    )}
                    {typeOptions[option].choices.map(choice => (
                      <label
                        key={choice}
                        className="flex flex-col items-start pt-2"
                        htmlFor={choice}
                      >
                        <input
                          className="mb-1"
                          type="radio"
                          value={choice}
                          id={choice}
                          name={option}
                          onChange={handleChange}
                          checked={options[option] === choice}
                        ></input>
                        <Label dark>{choice}</Label>
                      </label>
                    ))}
                  </div>
                )}

              {/* Booleans */}
              {/* {typeOptions[option].type === 'boolean' && (
                <input
                  name={option}
                  type="checkbox"
                  //   placeholder={typeOptions[option].default}
                  //   ref={refOptions[index]}
                  //   value={options[option] || ''}
                  onChange={handleChange}
                  className="checkbox"
                />
              )} */}

              {/* Array's */}
              {(typeOptions[option].type === 'array' ||
                typeOptions[option].type === 'boolean' ||
                typeOptions[option].type === 'function' ||
                typeOptions[option].type === 'array:string') && (
                <div className="bg-gray-200 text-gray-500 rounded text-sm p-2">
                  Not yet editable. Check back soon!
                </div>
              )}
            </div>
            <div className="pl-2 flex-shrink-0 flex items-center mt-auto h-10">
              <ButtonSmall
                disabled={!typeOptions[option].description}
                color="purple"
                icon="info"
                className="rounded-full"
                onClick={() =>
                  setDescriptionVisible(
                    descriptionVisible === option ? false : option
                  )
                }
              />
            </div>
          </div>

          {descriptionVisible === option && typeOptions[option].description && (
            <div className="mt-1 p-2 bg-purple-100 text-purple-600 rounded text-sm">
              {typeOptions[option].description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default FieldOptions;

FieldOptions.propTypes = {
  typeOptions: PropTypes.object,
  parentId: PropTypes.string,
  options: PropTypes.object,
  handleChange: PropTypes.func,
};
