import React from 'react';

import FieldAdd from './FieldAdd.jsx';
import FieldItem from './FieldItem.jsx';

const Fields = ({ schema, setSchema }) => (
  <section className="bg-gray-100 p-4 w-2/5 rounded-l-lg">
    <FieldAdd schema={schema} setSchema={setSchema} />

    <section className="flex flex-col">
      {schema.map((field, index) => (
        <FieldItem
          schema={schema}
          setSchema={setSchema}
          key={`${index}`}
          index={index}
          field={field}
        />
      ))}
    </section>
  </section>
);

export default Fields;
