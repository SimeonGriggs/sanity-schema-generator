import { validationRules } from './validationRules.js';

export const schemaTypes = {
  text: {
    title: 'Text',
    docs: 'https://www.sanity.io/docs/text-type',
    description: 'Value must be set to text.',
    options: {
      rows: {
        type: 'number',
        default: 10,
        description:
          'Controls the number of rows/lines in the rendered textarea. ',
      },
    },
    validation: {
      required: validationRules.required,
      min: validationRules.min,
      max: validationRules.max,
      length: validationRules.length,
      uppercase: validationRules.uppercase,
      lowercase: validationRules.lowercase,
      regex: validationRules.regex,
      custom: validationRules.custom,
    },
  },
  block: {
    title: 'Block',
    docs: 'https://www.sanity.io/docs/block-type',
    options: {},
    // options: {
    //   styles: { type: 'array' },
    //   lists: { type: 'array' },
    //   marks: { type: 'objects' },
    //   of: { type: 'array' },
    //   icon: { type: 'function' },
    // },
    // validation: {
    //   required: validationRules.required,
    //   custom: validationRules.custom,
    // },
  },
  boolean: {
    title: 'Boolean',
    docs: 'https://www.sanity.io/docs/boolean-type',
    options: {
      layout: {
        type: 'string',
        default: 'switch',
        description:
          "This let's you control the visual appearance of the input.",
        options: ['switch', 'checkbox'],
      },
    },
    validation: {
      required: validationRules.required,
      custom: validationRules.custom,
    },
  },
  date: {
    title: 'Date',
    docs: 'https://www.sanity.io/docs/date-type',
    options: {
      dateFormat: {
        type: 'string',
        default: 'YYYY-MM-DD',
        description:
          'Controls how the date input field formats the displayed date. Use any valid Moment format option. Default is YYYY-MM-DD.',
      },
      calendarTodayLabel: {
        type: 'string',
        default: 'today',
        description:
          'Label for the "jump to today" button on the date input widget. Default is Today.',
      },
    },
    validation: {
      required: validationRules.required,
      custom: validationRules.custom,
    },
  },
  datetime: {
    title: 'Datetime',
    options: {
      dateFormat: {
        type: 'string',
        default: 'YYYY-MM-DD',
        description:
          'Controls how the date input field formats the displayed date. Use any valid Moment format option. Default is YYYY-MM-DD.',
      },
      timeFormat: {
        type: 'string',
        default: 'HH:mm',
        description:
          'Controls how the date input field formats the displayed date. Use any valid Moment format option. Default is YYYY-MM-DD.',
      },
      timeStep: {
        type: 'number',
        default: '15',
        description:
          'Number of minutes between each entry in the time input. Default is 15 which lets the user choose between 09:00, 09:15, 09:30 and so on.',
      },
      calendarTodayLabel: {
        type: 'string',
        default: 'today',
        description:
          'Label for the "jump to today" button on the date input widget. Default is Today.',
      },
    },
    validation: {
      required: validationRules.required,
      min: validationRules.min,
      max: validationRules.max,
      custom: validationRules.custom,
    },
  },
  // document: {
  //   title: 'Document',
  //   docs: 'https://www.sanity.io/docs/document-type',
  // },
  file: {
    title: 'File',
    docs: 'https://www.sanity.io/docs/file-type',
    options: {
      fields: {
        type: 'array',
        description: 'An array of optional fields to add to the file field.',
      },
      storeOriginalFilename: {
        type: 'boolean',
        default: true,
        description:
          'This will store the original filename in the asset document.',
      },
      accept: {
        type: 'string',
        description:
          'This specifies which mime types the file input can accept. ',
      },
    },
    validation: {
      required: validationRules.required,
      custom: validationRules.custom,
    },
  },
  geopoint: {
    title: 'Geopoint',
    docs: 'https://www.sanity.io/docs/geopoint-type',
    options: {},
    validation: {
      required: validationRules.required,
      custom: validationRules.custom,
    },
  },
  image: {
    title: 'Image',
    options: {
      fields: {
        type: 'array',
        description: 'An array of optional fields to add to the image record.',
      },
      metadata: {
        type: 'array:string',
        description:
          'This option defines what metadata the server attempts to extract from the image.',
      },
      hotspot: {
        type: 'boolean',
        defaut: false,
        description:
          'Enables the user interface for selecting what areas of an image should always be cropped, what areas should never be cropped and the center of the area to crop around when resizing.',
      },
      storeOriginalFilename: {
        type: 'boolean',
        default: true,
        description:
          'This will store the original filename in the asset document.',
      },
      accept: {
        type: 'string',
        description:
          'This specifies which mime types the image input can accept.',
      },
      sources: {
        type: 'array:string',
        description:
          'Lock the asset sources available to this type to a spesific subset.',
      },
    },
    validation: {
      required: validationRules.required,
      custom: validationRules.custom,
    },
  },
  number: {
    title: 'Number',
    options: {
      list: {
        type: 'array:string',
        description: 'A list of predefined values that the user may pick from.',
      },
    },
    validation: {
      required: validationRules.required,
      min: validationRules.min,
      max: validationRules.max,
      lessThan: validationRules.lessThan,
      greaterThan: validationRules.greaterThan,
      integer: validationRules.integer,
      precision: validationRules.precision,
      positive: validationRules.positive,
      negative: validationRules.negative,
      custom: validationRules.custom,
    },
  },
  object: {
    title: 'Object',
    docs: 'https://www.sanity.io/docs/object-type',
    options: {
      // fields: {
      //   type: 'array',
      //   required: true,
      //   description:
      //     'The fields of this object. At least one field is required. See documentation below.',
      // },
      // TODO: These should populate a selectable list for all fields in this object
      fieldsets: {
        type: 'array:string',
        description:
          'A list of fieldsets that fields may belong to. Documentation below.',
      },
      preview: {
        type: 'object',
        description:
          'Use this to implement an override for the default preview for this type.',
      },
      // TODO: These fields actually need to be inside added fieldsets
      collapsible: {
        type: 'boolean',
        description:
          'If set to true, the object will make the fields collapsible.',
      },
      collapsed: {
        type: 'boolean',
        description: 'Set to true to display fields as collapsed initially.',
      },
      columns: {
        type: 'number',
        description:
          'Defines a grid for the fields and how many columns it should have',
      },
    },
    validation: {
      required: validationRules.required,
      custom: validationRules.custom,
    },
  },
  reference: {
    title: 'Reference',
    options: {
      // TODO:
      to: {
        required: true,
        type: 'array:string',
      },
      weak: {
        type: 'boolean',
        default: false,
        description: 'If set to true the reference will be made weak.',
      },
      // TODO: Handle the difference between a function and a string here
      filter: {
        type: 'string:function',
        description:
          'Can be a function. Additional GROQ-filter to use when searching for target documents.',
      },
    },
    validation: {
      required: validationRules.required,
      custom: validationRules.custom,
    },
  },
  slug: {
    title: 'Slug',
    docs: 'https://www.sanity.io/docs/slug-type',
    options: {
      source: {
        type: 'string:function',
        description:
          'The name of the field which the slug value is derived from.',
      },
      maxLength: {
        type: 'number',
        default: 200,
        description: 'Maximum number of characters the slug may contain.',
      },
      slugify: {
        type: 'function',
        description:
          'Supply a custom override function which handles string normalization.',
      },
      isUnique: {
        type: 'function',
        description:
          'Supply a custom function which checks whether or not the slug is unique.',
      },
    },
    validation: {
      required: validationRules.required,
      custom: validationRules.custom,
    },
  },
  string: {
    title: 'String',
    options: {
      // TODO: This can be strings or objects
      list: {
        type: 'array',
        description:
          'A list of predefined values that the user can choose from.',
      },
      layout: {
        type: 'string',
        default: 'dropdown',
        choices: ['dropdown', 'radio'],
        description: `Controls how the items defined in the list option are presented.`,
      },
      direction: {
        type: 'string',
        default: 'vertical',
        choices: ['vertical', 'horizontal'],
        description: 'Controls how radio buttons are lined up.',
      },
    },
    validation: {
      required: validationRules.required,
      min: validationRules.required,
      max: validationRules.required,
      length: validationRules.required,
      uppercase: validationRules.required,
      lowercase: validationRules.required,
      regex: validationRules.required,
      custom: validationRules.custom,
    },
  },
  // span: {},
  array: {
    title: 'Array',
    docs: 'https://www.sanity.io/docs/array-type',
    options: {
      // of: { type: 'array', required: true, description: 'Defines which types are allowed as members of the array.' }
      sortable: {
        type: 'boolean',
        default: true,
        description:
          'Controls whether the user is allowed to reorder the items in the array. Defaults to true.',
      },
      layout: {
        type: 'string',
        choices: ['tags', 'grid'],
        description:
          'If set to tags, renders the array as a single, tokenized input field. This option only works if the array contains strings.',
      },
      list: {
        type: 'array',
        description:
          'If set to tags, renders the array as a single, tokenized input field. This option only works if the array contains strings.',
      },
      editModal: {
        type: 'string',
        default: 'dialog',
        choices: ['dialog', 'fullscreen', 'popover'],
        description:
          'Controls how the modal (for array content editing) is rendered. ',
      },
    },
    validation: {
      required: validationRules.required,
      unique: validationRules.unique,
      min: validationRules.min,
      max: validationRules.max,
      length: validationRules.length,
      custom: validationRules.custom,
    },
  },
  url: {
    title: 'URL',
    options: {},
    validation: {
      uri: validationRules.uri,
      custom: validationRules.custom,
    },
  },
};
