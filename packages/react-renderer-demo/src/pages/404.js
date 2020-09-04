import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const rerouting = {
  '/renderer/get-started': '/introduction',
  '/renderer/installation': '/installation',
  '/renderer/development-setup': '/development-setup',
  '/renderer/component-mapping': '/mappers/custom-mapper',
  '/renderer/renderer-api': '/components/renderer',
  '/renderer/component-api': '/mappers/component-api',
  '/renderer/form-template': '/components/form-template',
  '/renderer/unmounting': '/schema/clear-on-unmount',
  '/renderer/initialize-mount': '/schema/initialize-on-mount',
  '/renderer/data-types': '/schema/data-types',
  '/renderer/file-input': '/mappers/file-input',
  '/renderer/cleared-value': '/schema/cleared-value',
  '/renderer/field-provider': '/components/field-provider',
  '/renderer/action-mapper': '/mappers/action-mapper',
  '/renderer/dynamic-fields': '/components/field-array',
  '/renderer/schema-validator': '/mappers/schema-validator-mapper',
  '/renderer/condition': '/schema/introduction#condition',
  '/renderer/validators': '/schema/introduction#validate'
};

const validatorHashMapper = {
  '#requiredvalidator': 'required-validator',
  '#lengthvalidators': 'length-validator',
  '#numbervaluevalidators': 'number-value-validator',
  '#patternvalidators': 'pattern-validator',
  '#urlvalidators': 'url-validator',
  '#customfunction': 'custom-validator',
  '#asyncvalidator': 'async-validator',
  '#customvalidatormapper': 'validator-mapper',
  '#recordlevelvalidation': 'record-level-validation',
  '#overwritingdefaultmessages': 'overwriting-default-message'
};

const conditionHashMapper = {
  '#schema': 'condition-schema',
  '#or': 'or',
  '#and': 'and',
  '#not': 'not',
  '#sequence': 'condition-sequence',
  '#nesting': 'condition-nesting',
  '#is': 'is',
  '#isempty': 'is-empty',
  '#isnotempty': 'is-not-empty',
  '#pattern': 'pattern',
  '#notmatch': 'not-match',
  '#conditionalactions': 'condition-actions',
  '#set': 'condition-set',
  '#visible': 'condition-visible',
  '#example': 'complex-condition-example'
};

const Custom404 = () => {
  const { push, asPath } = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hashPart = asPath.match(/#.*/);
    const hash = hashPart ? hashPart[0] : '';
    const pathname = asPath.replace(/(#|\?)+.*/, '');

    if (asPath.includes('/component-example/')) {
      setLoading(true);

      let newPath = asPath.replace('/component-example/', '/mappers/');

      if (!newPath.match(/\?mapper=/) && !newPath.match(/#/)) {
        newPath = `${newPath}?mapper=mui`;
      } else if (!newPath.match(/\?mapper=/)) {
        newPath = newPath.replace(/#/, '?mapper=mui#');
      }

      push(newPath);
    } else if (asPath.startsWith('/renderer/condition#') && conditionHashMapper[hash]) {
      setLoading(true);
      push(`/schema/${conditionHashMapper[hash]}`);
    } else if (asPath.startsWith('/renderer/validators#') && validatorHashMapper[hash]) {
      setLoading(true);
      push(`/schema/${validatorHashMapper[hash]}`);
    } else if (rerouting[pathname]) {
      setLoading(true);
      push(`${rerouting[pathname]}${hash}`);
    }
  }, []);

  return (
    <React.Fragment>
      <h1>404 - Page Not Found</h1>
      {loading ? (
        <div>Redirecting to new address...</div>
      ) : (
        <div>No page found. It is possible that the page was moved. Please use the navigation or search bar to find the page manually.</div>
      )}
    </React.Fragment>
  );
};

export default Custom404;
