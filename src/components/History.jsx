import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { createId } from '../helpers/helpers.js';

const History = ({ schema, setSchema }) => {
  const [history, setHistory] = useState({});
  const [historyId, setHistoryId] = useState('');

  function setSchemaHistory(id) {
    if (history[id]) {
      setSchema(history[id]);
      setHistoryId(id);
    }
  }

  useEffect(() => {
    if (!history[historyId]) {
      const allHistory = history;
      allHistory[createId()] = schema;
      setHistory(allHistory);
    }
  }, [history, historyId, schema]);

  return (
    <div className="bg-purple-500 fixed z-50 right-0 divide-y divide-purple-600 text-xs font-bold text-white flex flex-col items-start rounded-bl-lg shadow">
      {history &&
        Object.keys(history).map((id, index) => (
          <button
            key={id}
            type="button"
            onClick={() => setSchemaHistory(id)}
            className={`py-2 px-4 flex w-full leading-none transition-colors duration-200 hover:bg-purple-600 ${
              historyId === id ? `bg-purple-600` : ``
            }`}
          >
            <span className="font-mono pr-2 text-purple-300">{index}</span>
            <span>
              {history[id] && history[id].length === 1
                ? `${history[id].length} Field`
                : `${history[id].length} Fields`}
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
