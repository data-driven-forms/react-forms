import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import docsearch from 'docsearch.js';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';

const Root = styled('form')(({ theme }) => ({
  '&.wrapper': {
    marginRight: 16,
    '& .algolia-docsearch-suggestion.algolia-docsearch-suggestion__main.algolia-docsearch-suggestion__secondary': {
      textDecoration: 'none',
    },
    '& .algolia-autocomplete .algolia-docsearch-suggestion--title': {
      marginBottom: 0,
    },
    '& .ds-dropdown-menu': {
      [theme.breakpoints.down('md')]: {
        position: 'fixed !important',
        top: '50px !important',
        maxWidth: '100% !important',
        minWidth: '100%',
      },
      '& [class^=ds-dataset-]': {
        borderRadius: 0,
      },
      '&:before': {
        display: 'none',
      },
    },
  },
  '& .search-input': {
    '& input': {
      color: 'white',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'transparent',
    },
  },
  '& .search-icon': {
    fill: 'white',
  },
}));

const DocSearch = () => {
  const { push } = useRouter();
  useEffect(() => {
    docsearch({
      apiKey: '5e9dbd314423e38339595e183d1ae7b6',
      indexName: 'data-driven-forms',
      inputSelector: '#data-driven-forms-search',
      handleSelected: (input, event, suggestion) => {
        event.button = 0;
        push(suggestion.url.replace('https://data-driven-forms.org', ''));
        input.close();
      },
      // debug: true, // Set debug to true if you want to inspect the dropdown.
    });
  }, [push]);
  return (
    <Root className="wrapper">
      <TextField
        variant="standard"
        id="data-driven-forms-search"
        type="search"
        placeholder="Search..."
        className="search-input"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search className="search-icon" />
            </InputAdornment>
          ),
        }}
      />
    </Root>
  );
};

export default DocSearch;
