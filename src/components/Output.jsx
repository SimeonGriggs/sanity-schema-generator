import React, { useRef } from 'react';

const Output = ({ schema, setSchema }) => {
  const complete = {
    name: 'page',
    title: 'Pages',
    type: 'document',
    fields: schema,
  };

  return (
    <section className="bg-blue-900 text-blue-300 border-l border-l-gray-200 rounded-r rounded-r-lg p-2 px-4 flex-1 text-sm">
      <pre>export default {JSON.stringify(complete, null, '  ')}</pre>
    </section>
  );
};

export default Output;
