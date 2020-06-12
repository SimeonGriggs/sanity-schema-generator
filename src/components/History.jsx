import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { createId } from '../helpers/helpers.js';

const History = ({ schema, setSchema }) => {
  const [history, setHistory] = useState({
    previous: [],
    current: [],
    future: [],
  });

  useEffect(() => {
    if (!history.current.length) {
      setHistory({ ...history, current: [schema] });
    }
  }, [schema, history]);

  function setSchemaHistory(index) {
    const newCurrent = [];
    setHistory({ ...history, current: [schema] });
  }

  return (
    <div className="bg-purple-500 fixed z-50 right-0 divide-y divide-purple-600 text-xs font-bold text-white flex flex-col items-start rounded-bl-lg">
      {history.previous.length > 0 &&
        history.previous.map(index => (
          <button
            key={index}
            type="button"
            onClick={() => setSchemaHistory(index)}
            className="py-2 px-4 flex w-full leading-none transition-colors duration-200 hover:bg-purple-600 bg-gray-500"
          >
            <span className="font-mono pr-2 text-purple-300">{index}</span>
            {/* <span>
              {history[id] && history[id].length === 1
                ? `${history[id].length} Field`
                : `${history[id].length} Fields`}
            </span> */}
          </button>
        ))}
      {history.current.length > 0 &&
        history.current.map(index => (
          <button
            key={index}
            type="button"
            onClick={() => setSchemaHistory(index)}
            className="py-2 px-4 flex w-full leading-none transition-colors duration-200 hover:bg-purple-600 bg-purple-500"
          >
            <span className="font-mono pr-2 text-purple-300">{index}</span>
            {/* <span>
              {history[id] && history[id].length === 1
                ? `${history[id].length} Field`
                : `${history[id].length} Fields`}
            </span> */}
          </button>
        ))}
      {history.future.length > 0 &&
        history.future.map(index => (
          <button
            key={index}
            type="button"
            onClick={() => setSchemaHistory(index)}
            className="py-2 px-4 flex w-full leading-none transition-colors duration-200 hover:bg-purple-600 bg-blue-500"
          >
            <span className="font-mono pr-2 text-purple-300">{index}</span>
            {/* <span>
              {history[id] && history[id].length === 1
                ? `${history[id].length} Field`
                : `${history[id].length} Fields`}
            </span> */}
          </button>
        ))}
    </div>
  );
};

export default History;

History.propTypes = {
  schema: PropTypes.array,
  setSchema: PropTypes.func,
};
