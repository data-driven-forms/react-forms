import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Search from '@material-ui/icons/Search';
import docsearch from 'docsearch.js';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  docSearchWrapper: {
    marginRight: 16,
    '& .algolia-docsearch-suggestion.algolia-docsearch-suggestion__main.algolia-docsearch-suggestion__secondary': {
      textDecoration: 'none'
    },
    '& .algolia-autocomplete .algolia-docsearch-suggestion--title': {
      marginBottom: 0
    },
    '& .ds-dropdown-menu': {
      [theme.breakpoints.down('sm')]: {
        position: 'fixed !important',
        top: '50px !important',
        maxWidth: '100% !important',
        minWidth: '100%'
      },
      '& [class^=ds-dataset-]': {
        borderRadius: 0
      },
      '&:before': {
        display: 'none'
      }
    }
  },
  docSearchInput: {
    '& input': {
      color: 'white'
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'white'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white'
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'transparent'
    }
  },
  docSearchIcon: {
    fill: 'white'
  }
}));

const DocSearch = () => {
  const classes = useStyles();
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
      }
      // debug: true, // Set debug to true if you want to inspect the dropdown.
    });
  }, [push]);
  return (
    <form className={classes.docSearchWrapper}>
      <TextField
        id="data-driven-forms-search"
        type="search"
        placeholder="Search..."
        className={classes.docSearchInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search className={classes.docSearchIcon} />
            </InputAdornment>
          )
        }}
      />
    </form>
  );
};

export default DocSearch;
