import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { createId } from '../helpers/helpers.js';

const History = ({ schema, setSchema }) => {
  const [historyIndexes, setHistoryIndexes] = useState([schema]);
  const [history, setHistory] = useState({
    past: [],
    current: 0,
    future: [],
  });

  const updateHistory = useCallback(
    index => {
      // Get Schema ID and load
      setSchema(historyIndexes[index]);

      // Update keys
      const iterator = historyIndexes.keys();
      const past = [];
      const future = [];

      for (const key of iterator) {
        if (key !== index) {
          key < index ? past.push(key) : future.push(key);
        }
      }

      setHistory({ current: index, past, future });
    },
    [historyIndexes, setSchema]
  );

  // When schema changes, add a new index
  useEffect(() => {
    // Only add new history if 'future' is empty
    // if (history.future.length) return;

    const addToHistory = historyIndexes;
    addToHistory.push(schema);
    setHistoryIndexes(addToHistory);
  }, [history, historyIndexes, schema, updateHistory]);

  return (
    <div className="bg-purple-500 fixed z-50 right-0 divide-y divide-purple-600 text-xs font-bold text-white flex flex-col items-start rounded-bl-lg">
      {historyIndexes.length > 0 &&
        historyIndexes.map((historyIndex, index) => (
          <button
            key={`index-${index}`}
            type="button"
            onClick={() => updateHistory(index)}
            className={`py-2 px-4 flex w-full leading-none transition-colors duration-200 
            ${
              index === history.current
                ? `hover:bg-yellow-600 bg-yellow-500`
                : ``
            }`}
          >
            {history.past.includes(index) && (
              <span className="font-mono opacity-50 pr-2">&larr;</span>
            )}
            {index === history.current && (
              <span className="font-mono opacity-50 pr-2">=</span>
            )}
            {history.future.includes(index) && (
              <span className="font-mono opacity-50 pr-2">&rarr;</span>
            )}
            <span className="font-mono pr-2">{index}</span>
            <span>
              {historyIndexes[index] && historyIndexes[index].length === 1
                ? `${historyIndexes[index].length} Field`
                : `${historyIndexes[index].length} Fields`}
            </span>
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
