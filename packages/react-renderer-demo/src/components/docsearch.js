import React from 'react';
import { DocSearch as AlgDocSearch } from '@docsearch/react';

import '@docsearch/css';
import Link from 'next/link';

const DocSearch = () => (
  <AlgDocSearch
    hitComponent={({ hit, children }) => (
      <Link href={hit.url.replace('https://data-driven-forms.org', '')}>
        <a href={hit.url.replace('https://data-driven-forms.org', '')}>{children}</a>
      </Link>
    )}
    debug
    apiKey="89894d702d5ead6999eaf04e3b34012a"
    appId="4KH6MQCYWM"
    indexName="data-driven-forms"
  />
);

export default DocSearch;
