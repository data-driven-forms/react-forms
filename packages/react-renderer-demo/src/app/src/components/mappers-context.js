import { createContext } from 'react';

const MapperContext = createContext({
  loaded: false,
  mappers: {},
});

export default MapperContext;
