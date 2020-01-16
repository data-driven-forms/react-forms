import React from 'react';
import { useRouter } from 'next/router';
import { baseExamples } from '@docs/components/navigation/examples-definitions';
import ComponentExample from '@docs/components/component-example';

const ComponentExampleText = (props) => {
  const router = useRouter();

  const activeMapper = router.query.mapper || 'mui';

  const pathname = router.pathname;
  let component = pathname.split('/').pop();

  const baseStructure = baseExamples.find(item => item.component === component);

  return (<React.Fragment>
    <ComponentExample activeMapper={ activeMapper } component={ component }/>
    <baseStructure.ContentText activeMapper={ activeMapper } component={ component }/>
  </React.Fragment>);
};

export default ComponentExampleText;
