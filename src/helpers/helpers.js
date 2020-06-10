// Super-duper basic and not exactly safe sanitization
export function sanitize(string) {
  return string.replace(/[^a-zA-Z ]/g, '');
}

// Uppercase the first letter of a word
export function titleCaseWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Outputs 'camelCase'
export function formatName(string) {
  const sanitized = sanitize(string);
  const result = sanitized.replace(/([A-Z])/g, ' $1');

  const pascalled = result
    .split(' ')
    .map(word => titleCaseWord(word))
    .join('');

  const camelled = pascalled.charAt(0).toLowerCase() + pascalled.slice(1);

  return camelled.trim();
}

// Outputs 'Title Case'
export function formatTitle(string) {
  const sanitized = sanitize(string);

  // Uppercase words
  return sanitized
    .split(' ')
    .map(word => titleCaseWord(word))
    .join(' ')
    .trim();
}

export const schemaTypes = [
  'Text',
  'Array',
  'Object',
  'Boolean',
  'Date',
  'Datetime',
  'Number',
  'Image',
  'Slug',
  'String',
  'URL',
];

export function createId() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

const traverse = function(o, id, fieldMod, fn, scope = []) {
  for (const i in o) {
    fn.apply(this, [i, id, fieldMod, o[i], scope]);
    if (o[i] !== null && typeof o[i] === 'object') {
      traverse(o[i], id, fieldMod, fn, scope.concat(i));
    }
  }
};

/**
 * Find (and maybe replace) a field based by its ID
 * @param {Array} schema Array of fields, possibly nested
 * @param {string} id The ID of the field we're looking for and return the field
 * @param {Object} fieldMod Optional, replace the field and return the entire modified schema
 */
export function findFieldById(schema, id, fieldMod = false) {
  let findField = false;

  traverse(schema, id, fieldMod, (key, id, fieldMod, value, scope) => {
    if (key !== 'id') return;

    // Is `eval` bad? Probably.
    // Scope is a growing list array of keys that contain the position of our field in the original array
    // TODO: Can nested array keys be referenced dynamically?

    // !findField prevents this from running more than once
    if (value === id && !findField) {
      const scopeString = `schema[${scope
        .concat()
        .map(k => (isNaN(k) ? `'${k}'` : k))
        .join('][')}]`;

      if (fieldMod) {
        // Replace whole field
        if (fieldMod === 'delete') {
          const fieldIndex = scope.pop();
          const scopeParentString = `schema[${scope
            .concat()
            .map(k => (isNaN(k) ? `'${k}'` : k))
            .join('][')}]`;

          eval(`${scopeParentString}.splice(${fieldIndex}, 1)`);
        } else if (typeof fieldMod === 'number') {
          // Re-order array this field belongs to
          const index = parseInt(scope.pop());

          // Get the array this field is in
          const scopeParentString = `schema[${scope
            .concat()
            .map(k => (isNaN(k) ? `'${k}'` : k))
            .join('][')}]`;
          const currentArray = eval(`${scopeParentString}`);

          // Get the fields in the current and moving-to indexes
          const movingPosition = currentArray[index];
          const shiftedPosition = currentArray[index + fieldMod];

          currentArray[index + fieldMod] = movingPosition;
          currentArray[index] = shiftedPosition;
        } else {
          // Replace whole field
          eval(`${scopeString} = fieldMod`);
        }
        findField = true;
      } else {
        // Return field
        findField = eval(scopeString);
      }
    }
  });

  if (findField && fieldMod) return schema;
  if (findField) return findField;
}
