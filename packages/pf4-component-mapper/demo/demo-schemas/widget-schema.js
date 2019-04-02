export const schema =  {
  title: 'Widgets',
  type: 'object',
  properties: {
    stringFormats: {
      type: 'object',
      title: 'String formats',
      properties: {
        email: {
          type: 'string',
          format: 'email',
        },
        uri: {
          type: 'string',
          format: 'uri',
        },
      },
    },
    boolean: {
      type: 'object',
      title: 'Boolean field',
      properties: {
        defaultCheckbox: {
          type: 'boolean',
          title: 'checkbox (default)',
          description: 'This is the checkbox-description',
        },
        radio: {
          type: 'boolean',
          title: 'radio buttons',
          description: 'This is the radio-description',
        },
        select: {
          type: 'boolean',
          title: 'select box',
          description: 'This is the select-description',
        },
      },
    },
    string: {
      type: 'object',
      title: 'String field',
      properties: {
        defaultInput: {
          type: 'string',
          title: 'text input (default)',
        },
        textarea: {
          type: 'string',
          title: 'textarea',
        },
        color: {
          type: 'string',
          title: 'color picker',
          default: '#151ce6',
        },
      },
    },
    secret: {
      type: 'string',
      default: 'I\'m a hidden string.',
    },
    disabled: {
      type: 'string',
      title: 'A disabled field',
      default: 'I am disabled.',
    },
    readonly: {
      type: 'string',
      title: 'A readonly field',
      default: 'I am read-only.',
    },
    widgetOptions: {
      title: 'Custom widget with options',
      type: 'string',
      default: 'I am yellow',
    },
    selectWidgetOptions: {
      title: 'Custom select widget with options',
      type: 'string',
      enum: [
        'foo',
        'bar',
      ],
      enumNames: [
        'Foo',
        'Bar',
      ],
    },
  },
};

export const uiSchema = {
  boolean: {
    radio: {
      'ui:widget': 'radio',
    },
    select: {
      'ui:widget': 'select',
    },
  },
  string: {
    textarea: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 5,
      },
    },
    color: {
      'ui:widget': 'color',
    },
  },
  secret: {
    'ui:widget': 'hidden',
  },
  disabled: {
    'ui:disabled': true,
  },
  readonly: {
    'ui:readonly': true,
  },
  widgetOptions: {
    'ui:options': {
      backgroundColor: 'yellow',
    },
  },
  selectWidgetOptions: {
    'ui:options': {
      backgroundColor: 'pink',
    },
  },
};

export const conditionalSchema = {
  title: 'Web hook',
  description: 'This web hook allows us to send a JSON object from the service portal',
  type: 'object',
  required: [
    'url', 'secret',
  ],
  definitions: {
    Authentications: {
      title: 'Authentications',
      type: 'string',
      anyOf: [
        {
          type: 'string',
          enum: [
            'oauth',
          ],
          title: 'OAuth 2.0',
        },
        {
          type: 'string',
          enum: [
            'basic',
          ],
          title: 'Basic Authentication',
        },
        {
          type: 'string',
          enum: [
            'none',
          ],
          title: 'No Authentication needed',
        },
      ],
    },
  },
  properties: {
    url: {
      type: 'string',
      title: 'URL',
      description: 'The URL which will be receving this request',
      pattern: '^(http|https)://*',
    },
    verify_ssl: { // eslint-disable-line camelcase
      type: 'boolean',
      default: true,
      title: 'Verify Server Certificate',
    },
    secret: {
      type: 'string',
      title: 'Secret',
              description: 'If specified we will create a HMAC signature of the body with the secret and include it in the HTTP Header X-Service-Portal-Signature' // eslint-disable-line
    },
    authentication: {
      $ref: '#/definitions/Authentications',
      title: 'Authentication',
      default: 'none',
    },
  },
  dependencies: {
    authentication: {
      oneOf: [
        {
          properties: {
            authentication: {
              enum: [
                'none',
              ],
            },
          },
        },
        {
          properties: {
            authentication: {
              enum: [
                'oauth',
              ],
            },
            token: {
              type: 'string',
              title: 'Bearer Token',
              description: 'For OAuth 2.0 authentication please provide a token',
            },

          },
        },
        {
          properties: {
            authentication: {
              enum: [
                'basic',
              ],
            },
            userid: {
              type: 'string',
              title: 'Username',
              description: 'For basic authentication please provide a userid',
            },
            password: {
              type: 'string',
              title: 'Password',
              format: 'password',
              description: 'For basic authentication please provide a password',
            },

          },
        },
      ],
    },
  },
};

export const arraySchema = {
  definitions: {
    Thing: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          default: 'Default name',
        },
      },
    },
  },
  type: 'object',
  properties: {
    listOfStrings: {
      type: 'array',
      title: 'A list of strings',
      items: {
        type: 'string',
        default: 'bazinga',
      },
    },
    multipleChoicesList: {
      type: 'array',
      title: 'A multiple choices list',
      items: {
        type: 'string',
        enum: [
          'foo',
          'bar',
          'fuzz',
          'qux',
        ],
      },
      uniqueItems: true,
    },
    fixedItemsList: {
      type: 'array',
      title: 'A list of fixed items',
      items: [
        {
          title: 'A string value',
          type: 'string',
          default: 'lorem ipsum',
        },
        {
          title: 'a boolean value',
          type: 'boolean',
        },
      ],
      additionalItems: {
        title: 'Additional item',
        type: 'number',
      },
    },
    minItemsList: {
      type: 'array',
      title: 'A list with a minimal number of items',
      minItems: 3,
      items: {
        $ref: '#/definitions/Thing',
      },
    },
    defaultsAndMinItems: {
      type: 'array',
      title: 'List and item level defaults',
      minItems: 5,
      default: [
        'carp',
        'trout',
        'bream',
      ],
      items: {
        type: 'string',
        default: 'unidentified',
      },
    },
    nestedList: {
      type: 'array',
      title: 'Nested list',
      items: {
        type: 'array',
        title: 'Inner list',
        items: {
          type: 'string',
          default: 'lorem ipsum',
        },
      },
    },
    unorderable: {
      title: 'Unorderable items',
      type: 'array',
      items: {
        type: 'string',
        default: 'lorem ipsum',
      },
    },
    unremovable: {
      title: 'Unremovable items',
      type: 'array',
      items: {
        type: 'string',
        default: 'lorem ipsum',
      },
    },
    noToolbar: {
      title: 'No add, remove and order buttons',
      type: 'array',
      items: {
        type: 'string',
        default: 'lorem ipsum',
      },
    },
    fixedNoToolbar: {
      title: 'Fixed array without buttons',
      type: 'array',
      items: [
        {
          title: 'A number',
          type: 'number',
          default: 42,
        },
        {
          title: 'A boolean',
          type: 'boolean',
          default: false,
        },
      ],
      additionalItems: {
        title: 'A string',
        type: 'string',
        default: 'lorem ipsum',
      },
    },
  },
};

export const uiArraySchema = {
  listOfStrings: {
    items: {
      'ui:emptyValue': '',
    },
  },
  multipleChoicesList: {
    'ui:widget': 'checkboxes',
  },
  fixedItemsList: {
    items: [
      {
        'ui:widget': 'textarea',
      },
      {
        'ui:widget': 'select',
      },
    ],
    additionalItems: {
      'ui:widget': 'updown',
    },
  },
  unorderable: {
    'ui:options': {
      orderable: false,
    },
  },
  unremovable: {
    'ui:options': {
      removable: false,
    },
  },
  noToolbar: {
    'ui:options': {
      addable: false,
      orderable: false,
      removable: false,
    },
  },
  fixedNoToolbar: {
    'ui:options': {
      addable: false,
      orderable: false,
      removable: false,
    },
  },
};
