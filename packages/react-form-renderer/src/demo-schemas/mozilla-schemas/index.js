export const simple = {
  title: 'A registration form',
  description: 'A simple form example.',
  type: 'object',
  required: [
    'firstName',
    'lastName',
  ],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    age: {
      type: 'integer',
      title: 'Age',
    },
    bio: {
      type: 'string',
      title: 'Bio',
    },
    password: {
      type: 'string',
      title: 'Password',
      minLength: 3,
    },
    telephone: {
      type: 'string',
      title: 'Telephone',
      minLength: 10,
    },
  },
};

export const uiSchemaSimple = {
  firstName: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
  },
  age: {
    'ui:widget': 'updown',
    'ui:title': 'Age of person',
    'ui:description': '(earthian year)',
  },
  bio: {
    'ui:widget': 'textarea',
  },
  password: {
    'ui:widget': 'password',
    'ui:help': 'Hint: Make it strong!',
  },
  telephone: {
    'ui:options': {
      inputType: 'tel',
    },
  },
};

/**
  * Lauras form usecases
  */

export const lauraSchema1 = {
  type: 'object',
  required: [ 'title' ],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new provider' },
    done: { type: 'boolean', title: 'Done?', default: false },
  },
};

export const lauraSchema2 = {
  title: 'Add an Openshift Provider',
  type: 'object',
  properties: {
    name: { title: 'Provider Name', type: 'string' },
    description: { title: 'Description', type: 'string' },
    url: { title: 'URL', type: 'string' },
    verify_ssl: { title: 'Verify SSL', type: 'boolean', default: false }, // eslint-disable-line camelcase
    user: { title: 'User Name', type: 'string', default: '' },
    token: { title: 'Token', type: 'string', default: '' },
    password: { title: 'Password', type: 'string', minLength: 6 },
  },
  required: [ 'name', 'url' ],
};

export const lauraUiSchema = {
  password: {
    'ui:widget': 'password',
  },
};

export const benchmarchUiSchema = {
  '0typnpcsapb': {
    'ui:widget': 'textarea',
  },

};

export const benchmark = {
  title: 'Add an Openshift Provider',
  type: 'object',
  required: [ 'name', 'url' ],
  properties: {
    '0typnpcsapb': { title: 'Provider Name', type: 'string' },
    '0ujxmbpheqp': { title: 'Description', type: 'string' },
    '0igxbbgefiy': { title: 'URL', type: 'string' },
    '0ymxsbbnvhr': { title: 'Verify SSL', type: 'boolean', default: false },
    '0sinrdrawrc': { title: 'Token', type: 'string', default: '' },
    '0pzhrzaqlev': { title: 'Provider Name', type: 'string' },
    '0grbumqfbdf': { title: 'Password', type: 'string', minlength: 6 },
    '1xbwrkocghx': { title: 'Provider Name', type: 'string' },
    '1jlnvrdletr': { title: 'Description', type: 'string' },
    '1nutqqzmmdl': { title: 'URL', type: 'string' },
    '1otfcpssbia': { title: 'Verify SSL', type: 'boolean', default: false },
    '1qoekvwtlxh': { title: 'Token', type: 'string', default: '' },
    '1bznwozzuel': { title: 'Provider Name', type: 'string' },
    '1uukcsggjcw': { title: 'Password', type: 'string', minlength: 6 },
    '2hbxarbsnwl': { title: 'Provider Name', type: 'string' },
    '2zrdrvfjfgn': { title: 'Description', type: 'string' },
    '2lmtpcpntqh': { title: 'URL', type: 'string' },
    '2tdrxrquqgh': { title: 'Verify SSL', type: 'boolean', default: false },
    '2roloctixhv': { title: 'Token', type: 'string', default: '' },
    '2rthxazlwbs': { title: 'Provider Name', type: 'string' },
    '2istklqsvxq': { title: 'Password', type: 'string', minlength: 6 },
    '3qbmuzkgmdd': { title: 'Provider Name', type: 'string' },
    '3qixbhoqwoa': { title: 'Description', type: 'string' },
    '3psewlqfnhw': { title: 'URL', type: 'string' },
    '3dzssevqlpb': { title: 'Verify SSL', type: 'boolean', default: false },
    '3mgaabkzwah': { title: 'Token', type: 'string', default: '' },
    '3kfbulbogxh': { title: 'Provider Name', type: 'string' },
    '3vmgsbhioqu': { title: 'Password', type: 'string', minlength: 6 },
    '4qpabiveask': { title: 'Provider Name', type: 'string' },
    '4jjnmcfdebp': { title: 'Description', type: 'string' },
    '4nbqouebuuk': { title: 'URL', type: 'string' },
    '4nfdevtvlrq': { title: 'Verify SSL', type: 'boolean', default: false },
    '4warabfuopr': { title: 'Token', type: 'string', default: '' },
    '4kxvvchpfeb': { title: 'Provider Name', type: 'string' },
    '4zovuggbhmp': { title: 'Password', type: 'string', minlength: 6 },
    '5xamdsohpad': { title: 'Provider Name', type: 'string' },
    '5nwfngvzrbh': { title: 'Description', type: 'string' },
    '5jsrsailgee': { title: 'URL', type: 'string' },
    '5whshmgodbt': { title: 'Verify SSL', type: 'boolean', default: false },
    '5pvvpckxzft': { title: 'Token', type: 'string', default: '' },
    '5nygowqcane': { title: 'Provider Name', type: 'string' },
    '5uevjqepatw': { title: 'Password', type: 'string', minlength: 6 },
    '6dpwkmlvdgt': { title: 'Provider Name', type: 'string' },
    '6tytrqcbetf': { title: 'Description', type: 'string' },
    '6kxxqxkedjl': { title: 'URL', type: 'string' },
    '6doprxmshog': { title: 'Verify SSL', type: 'boolean', default: false },
    '6zogeyyhleg': { title: 'Token', type: 'string', default: '' },
    '6imkionlcyk': { title: 'Provider Name', type: 'string' },
    '6fxxzhadqjn': { title: 'Password', type: 'string', minlength: 6 },
    '7uoxkyrrlzg': { title: 'Provider Name', type: 'string' },
    '7fqloslcdqm': { title: 'Description', type: 'string' },
    '7ysyghwfzda': { title: 'URL', type: 'string' },
    '7jpfvmjwqwt': { title: 'Verify SSL', type: 'boolean', default: false },
    '7usmfgpmeai': { title: 'Token', type: 'string', default: '' },
    '7tadcixfvfs': { title: 'Provider Name', type: 'string' },
    '7xmsikczfor': { title: 'Password', type: 'string', minlength: 6 },
    '8fahorsvlzj': { title: 'Provider Name', type: 'string' },
    '8vtptnyzxyx': { title: 'Description', type: 'string' },
    '8selkjedxna': { title: 'URL', type: 'string' },
    '8hziaaotznr': { title: 'Verify SSL', type: 'boolean', default: false },
    '8ypgtvdydfy': { title: 'Token', type: 'string', default: '' },
    '8pjfinvezwm': { title: 'Provider Name', type: 'string' },
    '8hxpuxrsotp': { title: 'Password', type: 'string', minlength: 6 },
    '9wlnegsvtzh': { title: 'Provider Name', type: 'string' },
    '9kgtpnqkjpu': { title: 'Description', type: 'string' },
    '9kozehumfdb': { title: 'URL', type: 'string' },
    '9wielcalalv': { title: 'Verify SSL', type: 'boolean', default: false },
    '9euladfeygy': { title: 'Token', type: 'string', default: '' },
    '9nsdbjfdhfo': { title: 'Provider Name', type: 'string' },
    '9ssxbbsmiey': { title: 'Password', type: 'string', minlength: 6 },
  },
};

export const nestedSchema = {
  title: 'A list of tasks',
  type: 'object',
  required: [
    'title',
  ],
  properties: {
    title: {
      type: 'string',
      title: 'Task list title',
    },
    tasks: {
      type: 'array',
      title: 'Tasks',
      items: {
        type: 'object',
        required: [
          'title',
        ],
        properties: {
          title: {
            type: 'string',
            title: 'Title',
            description: 'A sample title',
          },
          details: {
            type: 'string',
            title: 'Task details',
            description: 'Enter the task details',
          },
          done: {
            type: 'boolean',
            title: 'Done?',
            default: false,
          },
        },
      },
    },
  },
};

export const nestedUiSchema = {
  tasks: {
    items: {
      details: {
        'ui:widget': 'textarea',
      },
    },
  },
};

export const widgets = {
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

export const uiWidgets = {
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

export const arrayUiSchema = {
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

export const numberSchema = {
  type: 'object',
  title: 'Number fields & widgets',
  properties: {
    number: {
      title: 'Number',
      type: 'number',
    },
    integer: {
      title: 'Integer',
      type: 'integer',
    },
    numberEnum: {
      type: 'number',
      title: 'Number enum',
      enum: [
        1,
        2,
        3,
      ],
    },
    numberEnumRadio: {
      type: 'number',
      title: 'Number enum',
      enum: [
        1,
        2,
        3,
      ],
    },
    integerRange: {
      title: 'Integer range',
      type: 'integer',
      minimum: 42,
      maximum: 100,
    },
    integerRangeSteps: {
      title: 'Integer range (by 10)',
      type: 'integer',
      minimum: 50,
      maximum: 100,
      multipleOf: 10,
    },
  },
};

export const numberUiSchema = {
  integer: {
    'ui:widget': 'updown',
  },
  numberEnumRadio: {
    'ui:widget': 'radio',
    'ui:options': {
      inline: true,
    },
  },
  integerRange: {
    'ui:widget': 'range',
  },
  integerRangeSteps: {
    'ui:widget': 'range',
  },
};

export const widgetSchema = {
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
        default: {
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
        default: {
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

export const uiWidgetSchema = {
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

export const orderingSchema = {
  title: 'A registration form',
  type: 'object',
  required: [
    'firstName',
    'lastName',
  ],
  properties: {
    password: {
      type: 'string',
      title: 'Password',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    bio: {
      type: 'string',
      title: 'Bio',
    },
    firstName: {
      type: 'string',
      title: 'First name',
    },
    age: {
      type: 'integer',
      title: 'Age',
    },
  },
};

export const uiOrderingSchema = {
  'ui:order': [
    'firstName',
    'lastName',
    '*',
    'password',
  ],
  age: {
    'ui:widget': 'updown',
  },
  bio: {
    'ui:widget': 'textarea',
  },
  password: {
    'ui:widget': 'password',
  },
};

export const referencesSchema = {
  definitions: {
    address: {
      type: 'object',
      properties: {
        street_address: { // eslint-disable-line camelcase
          type: 'string',
        },
        city: {
          type: 'string',
        },
        state: {
          type: 'string',
        },
      },
      required: [
        'street_address',
        'city',
        'state',
      ],
    },
  },
  type: 'object',
  properties: {
    billing_address: { // eslint-disable-line camelcase
      title: 'Billing address',
      $ref: '#/definitions/address',
    },
    shipping_address: { // eslint-disable-line camelcase
      title: 'Shipping address',
      $ref: '#/definitions/address',
    },
  },
};

export const uiReferencesSchema = {
  'ui:order': [
    'shipping_address',
    'billing_address',
    'tree',
  ],
};

export const anyOfSelectSchema = {
  title: 'Web hook',
  description: 'This web hook allows us to send a JSON object from the service portal',
  type: 'object',
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
    authentication: {
      $ref: '#/definitions/Authentications',
      title: 'Authentication',
      default: 'none',
    },

  },
};

export const conditionalSchema = {
  title: 'Web hook',
  description: 'This web hook allows us to send a JSON object from the service portal',
  type: 'object',
  required: [
    'url',
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
