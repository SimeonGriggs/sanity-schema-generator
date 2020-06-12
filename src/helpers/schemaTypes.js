export const schemaTypes = {
  text: {
    title: 'Text',
    options: {
      rows: { type: 'number', default: 10 },
    },
  },
  boolean: {
    title: 'Boolean',
    options: {},
  },
  date: {
    title: 'Date',
    options: {
      dateFormat: { type: 'string', default: 'YYYY-MM-DD' },
      calendarTodayLabel: { type: 'string', default: 'today' },
    },
  },
  datetime: {
    title: 'Datetime',
    options: {
      dateFormat: { type: 'string', default: 'YYYY-MM-DD' },
      timeFormat: { type: 'string', default: 'HH:mm' },
      timeStep: { type: 'number', default: '15' },
      calendarTodayLabel: { type: 'string', default: 'today' },
    },
  },
  array: {
    title: 'Array',
    options: {},
  },
  object: {
    title: 'Object',
    options: {},
  },
  number: {
    title: 'Number',
    options: {},
  },
  image: {
    title: 'Image',
    options: {},
  },
  reference: {
    title: 'Reference',
    options: {
      to: {
        required: true,
        type: 'array',
      },
    },
  },
  slug: {
    title: 'Slug',
    options: {
      source: { type: 'string' },
      maxLength: { type: 'number', default: 200 },
    },
  },
  string: {
    title: 'String',
    options: {},
  },
  url: {
    title: 'URL',
    options: {},
  },
};
