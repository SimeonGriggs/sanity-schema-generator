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
