import React from 'react';
import { useRouter } from 'next/router';
import { baseExamples } from '@docs/components/navigation/examples-definitions';
import ComponentExample from '@docs/components/component-example';
import { Heading } from './mdx/mdx-components';

const ComponentExampleText = () => {
  const router = useRouter();

  const activeMapper = router.query.mapper || 'mui';

  const pathname = router.pathname;
  let component = pathname.split('/').pop();

  const baseStructure = baseExamples.find(item => item.component === component);

  return (<React.Fragment>
    <Heading level="4" component="h1">{ baseStructure.linkText }</Heading>
    <ComponentExample activeMapper={ activeMapper } component={ component }/>
    <div hidden={ activeMapper !== 'mui' } className="mui">
      <Heading level="5" component="h2">{ `MUI ${baseStructure.linkText}` }</Heading>
      <baseStructure.ContentText activeMapper={ 'mui' } component={ component }/>
    </div>
    <div hidden={ activeMapper !== 'pf3' }>
      <Heading level="5" component="h2">{ `PF3 ${baseStructure.linkText}` }</Heading>
      <baseStructure.ContentText activeMapper={ 'pf3' } component={ component }/>
    </div>
    <div hidden={ activeMapper !== 'pf4' }>
      <Heading level="5" component="h2">{ `PF4 ${baseStructure.linkText}` }</Heading>
      <baseStructure.ContentText activeMapper={ 'pf4' } component={ component }/>
    </div>
  </React.Fragment>);
};

export default ComponentExampleText;
