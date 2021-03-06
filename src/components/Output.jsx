import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import ButtonSmall from './ButtonSmall.jsx';

const Output = ({ schema }) => {
  const refTextarea = useRef();
  const [copyNotification, setCopyNotification] = useState(false);

  const complete = {
    name: 'page',
    title: 'Pages',
    type: 'document',
    fields: schema,
  };

  // Remove the 'id' key from output
  function replacer(key, value) {
    if (key === 'id') return undefined;

    return value;
  }

  // Copies schema from hidden textarea
  function copyToClipboard() {
    if (!refTextarea.current) return null;

    refTextarea.current.select();
    document.execCommand('copy');
    refTextarea.current.blur();
    setCopyNotification(true);

    setTimeout(() => setCopyNotification(false), 1000);
  }

  return (
    <section className="output bg-blue-900 text-white rounded-lg p-2 px-4 flex-1 text-sm relative flex flex-col">
      <div className="absolute flex items-center top-0 right-0 py-2 px-4">
        <div
          className={`text-white font-bold transition-opacity duration-200 ease-in-out p-2 ${
            copyNotification ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Copied!
        </div>
        <ButtonSmall
          onClick={() => copyToClipboard()}
          color="aqua"
          icon="clipboardCopy"
        />
      </div>

      <pre className="text-xs">
        export default{' '}
        {JSON.stringify(complete, replacer, '  ').replace(
          /"(\w+)"\s*:/g,
          '$1:'
        )}
      </pre>

      <form className="absolute opacity-0 pointer-events-none">
        <textarea
          readOnly
          ref={refTextarea}
          value={`export default ${JSON.stringify(
            complete,
            replacer,
            '  '
          ).replace(/"(\w+)"\s*:/g, '$1:')}`}
        />
      </form>
    </section>
  );
};

export default Output;

Output.propTypes = {
  schema: PropTypes.array,
};
