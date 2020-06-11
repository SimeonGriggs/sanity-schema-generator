export const schemaTypes = {
  text: {
    title: 'Text',
    options: {
      rows: 'number',
    },
  },
  boolean: {
    title: 'Boolean',
  },
  date: {
    title: 'Date',
    options: {
      dateFormat: 'string',
      calendarTodayLabel: 'string',
    },
  },
  datetime: {
    title: 'Datetime',
    options: {
      dateFormat: 'string',
      timeFormat: 'string',
      timeStep: 'number',
      calendarTodayLabel: 'string',
    },
  },
  array: {
    title: 'Array',
  },
  object: {
    title: 'Object',
  },
  number: {
    title: 'Number',
  },
  image: {
    title: 'Image',
  },
  slug: {
    title: 'Slug',
    options: {
      source: 'string',
      maxLength: 'number',
    },
  },
  string: {
    title: 'String',
  },
  url: {
    title: 'URL',
    options: {},
  },
};
