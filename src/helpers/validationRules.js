export const validationRules = {
  required: {
    type: 'function',
    description: 'Ensures that this field exists.',
  },
  min: {
    type: 'function',
    param: 'minLength',
    description: 'Minimum length of string.',
  },
  max: {
    type: 'function',
    param: 'maxLength',
    description: 'Maximum length of string.',
  },
  length: {
    type: 'function',
    param: 'exactLength',
    description: 'Exact length of string.',
  },
  uppercase: {
    type: 'function',
    description: 'All characters must be uppercase.',
  },
  lowercase: {
    type: 'function',
    description: 'All characters must be lowercase.',
  },
  regex: {
    type: 'function',
    param: 'pattern[, options]',
    description: 'String must match the given pattern.',
  },
  custom: {
    type: 'function',
    param: 'fn',
    description: 'Creates a custom validation rule.',
  },
  unique: {
    type: 'function',
    description:
      'Requires all values within the array to be unique. Does a deep comparison, only excluding the _key property when comparing objects.',
  },
  lessThan: {
    type: 'function',
    description: 'Value must be less than the given limit.',
  },
  greaterThan: {
    type: 'function',
    description: 'Value must be greater than the given limit.',
  },
  integer: {
    type: 'function',
    description: 'Value must be an integer (no decimals).',
  },
  precision: {
    type: 'function',
    param: 'limit',
    description: 'Specifies the maximum number of decimal places allowed.',
  },
  positive: {
    type: 'function',
    description: 'Requires the number to be positive (>= 0).',
  },
  negative: {
    type: 'function',
    description: 'Requires the number to be negative (< 0).',
  },
  // TODO: These params need details
  uri: {
    type: 'function',
    description: 'Requires the number to be negative (< 0).',
  },
};
