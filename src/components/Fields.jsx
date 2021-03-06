import React from 'react';
import PropTypes from 'prop-types';

import FieldList from './FieldList.jsx';
import FieldAdd from './FieldAdd.jsx';

const Fields = ({ schema, setSchema }) => (
  <section className="md:fixed h-screen p-4 md:w-2/5 xl:w-1/3 overflow-scroll">
    <div className="bg-gray-100 text-gray-900 rounded-lg shadow min-h-full">
      <FieldAdd schema={schema} setSchema={setSchema} />

      {schema.length > 0 && <FieldList schema={schema} setSchema={setSchema} />}
    </div>
  </section>
);

export default Fields;

Fields.propTypes = {
  schema: PropTypes.array,
  setSchema: PropTypes.func,
};
