import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
import Mapper from './mapper';
import { makeStyles } from '@material-ui/core/styles';
import { navStyles } from './nav-styles';

const useStyles = makeStyles(navStyles);

const createLink = (...args) => args.join('/');

const renderItems = (items, level = 0, previousLinks = [ '' ]) => {
  if (!items) {
    return null;
  }

  if (Array.isArray(items)) {
    return items.map(item => renderItems(item, level, previousLinks));
  }

  const { fields, title, link, linkText, component, open, ...props } = items;

  if (fields) {
    return (
      <Mapper.wrapper
        key={ `${link}-${title}-${open}` }
        open={ open }
        fields={ fields }
        title={ title }
        link={ link }
        level={ level }
        previousLinks={ previousLinks }
        renderItems={ renderItems }
        { ...props }
      />
    );}

  return (
    <Mapper.item
      href={ createLink(...previousLinks, link || component) }
      level={ level }
      key={ `${link || component}-${linkText}` }
      linkText={ linkText }
      component={ component }
      { ...props }
    />
  );
};

const MenuRenderer = ({ schema }) => {
  return <React.Fragment>{ renderItems(schema) }</React.Fragment>;
};

const searchFunction = (linkText, value) =>
  linkText
  .toLowerCase()
  .replace(/ /g, '')
  .includes(value.toLowerCase().replace(/ /g, ''));

const filterSchema = (schema, value) => {
  if (schema.fields) {
    const result = filterSchema(schema.fields, value);
    if (result) {
      return {
        ...schema,
        open: true,
        fields: result,
      };
    }

    return null;
  }

  if (Array.isArray(schema)) {
    const result = schema
    .map(field => filterSchema(field, value))
    .filter(x => x);
    if (result.length > 0) {
      return result;
    }

    return null;
  }

  return searchFunction(schema.linkText, value) ? schema : null;
};

const memoizeSearch = () => {
  const cache = {};

  return (schema, value) => {
    if (value in cache) {
      return cache[value];
    }

    cache[value] = filterSchema(schema, value);
    return cache[value];
  };
};

const findSelected = (schema, currentLocation, level = 1) => {
  if (schema.fields) {
    return {
      ...schema,
      open: schema.link === currentLocation[level],
      level,
      fields: findSelected(schema.fields, currentLocation, level + 1),
    };
  }

  if (Array.isArray(schema)) {
    return schema.map(field => findSelected(field, currentLocation, level));
  }

  return schema;
};

const memoizeCurrent = () => {
  const cache = {};

  return (schema, currentLocation) => {
    const value = currentLocation.join('-');

    if (value in cache) {
      return cache[value];
    }

    cache[value] = findSelected(schema, currentLocation);
    return cache[value];
  };
};

const search = memoizeSearch();
const current = memoizeCurrent();

const Menu = ({ schema, searchRef }) => {
  const router = useRouter();
  const [ value, setValue ] = useState('');
  const classes = useStyles();
  const currentLocation = router.pathname.split('/');

  const schemaFiltered = value !== '' ? search(schema, value) : current(schema, currentLocation);

  return (
    <React.Fragment>
      <TextField
        id="standard-search"
        placeholder="Search"
        type="search"
        margin="normal"
        value={ value }
        onChange={ e => setValue(e.target.value) }
        className={ classes.searchButton }
        inputRef={ searchRef }
        autoFocus
      />
      <MenuRenderer schema={ schemaFiltered } />
    </React.Fragment>
  );
};

export default Menu;
