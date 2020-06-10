import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

import FieldItem from './FieldItem.jsx';
import { findFieldById } from '../helpers/helpers.js';

const FieldList = ({ schema, setSchema, hasParent, parentId }) => {
  const parentField = parentId ? findFieldById(schema, parentId) : false;

  let children = [];

  if (!parentId) {
    children = schema;
  } else if (parentField && parentField.type === 'array') {
    children = parentField.of;
  } else if (parentField && parentField.type === 'object') {
    children = parentField.fields;
  }

  return (
    <section
      className={`flex flex-col divide-gray-300 divide-y 
      ${hasParent ? `px-0` : `px-2`}
      ${parentId ? `mt-2 border-l-4 ` : ``}
      `}
    >
      <AnimatePresence>
        {children.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.1 }}
            positionTransition
          >
            <FieldItem
              schema={schema}
              setSchema={setSchema}
              key={field.id}
              index={index}
              count={children.length}
              field={field}
              parentId={parentId}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};

export default FieldList;

FieldList.propTypes = {
  schema: PropTypes.array,
  setSchema: PropTypes.func,
  hasParent: PropTypes.bool,
  parentId: PropTypes.string,
};
