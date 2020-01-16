import React from 'react';
import { useRouter } from 'next/router';
import { baseExamples } from '@docs/components/navigation/examples-definitions';
import ComponentExample from '@docs/components/component-example';
import { Heading } from './mdx/mdx-components';

const ComponentExampleText = ({ activeMapper }) => {
  const router = useRouter();

  console.log(router);

  const pathname = router.pathname;
  let component = pathname.split('/').pop();

  const baseStructure = baseExamples.find(item => item.component === component);

  return (<React.Fragment>
    <Heading level="4" component="h1">{ baseStructure.linkText }</Heading>
    <ComponentExample activeMapper={ activeMapper } component={ component }/>
    <baseStructure.ContentText activeMapper={ activeMapper } component={ component }/>
  </React.Fragment>);
};

export default ComponentExampleText;
