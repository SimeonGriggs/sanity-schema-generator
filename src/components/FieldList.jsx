import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

import FieldItem from './FieldItem.jsx';
import { findFieldById } from '../helpers/helpers.js';

const FieldList = ({ schema, setSchema, parentId }) => {
  const parentField = parentId ? findFieldById(schema, parentId) : false;

  let children = [];
  if (!parentId) {
    children = schema;
  } else if (parentField && parentField.of) {
    children = parentField.of;
  } else if (parentField && parentField.fields) {
    children = parentField.fields;
  }

  if (!children.length) return null;

  return (
    <section
      className={`flex flex-col divide-gray-300 divide-y 
      ${parentId ? `border-l-4` : `px-2`}
      `}
    >
      <AnimatePresence>
        {children
          .filter(field => field.id)
          .map((field, index) => (
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
  parentId: PropTypes.string,
};
