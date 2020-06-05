import React, { useRef, useState } from 'react';

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

  function copyToClipboard() {
    if (!refTextarea.current) return null;

    refTextarea.current.select();
    document.execCommand('copy');
    refTextarea.current.blur();
    setCopyNotification(true);

    setTimeout(() => setCopyNotification(false), 1000);
  }

  return (
    <section className="bg-blue-900 text-blue-300 border-l border-l-gray-200 rounded-r rounded-r-lg p-2 px-4 flex-1 text-sm relative">
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
          color="green"
          icon="documentDuplicate"
        />
      </div>

      <pre>export default {JSON.stringify(complete, null, '  ')}</pre>

      <form className="absolute opacity-0 pointer-events-none">
        <textarea
          readOnly
          ref={refTextarea}
          value={`export default ${JSON.stringify(complete, null, '  ')}`}
        />
      </form>
    </section>
  );
};

export default Output;
